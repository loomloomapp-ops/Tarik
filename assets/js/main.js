/* TARIK Invest — static site interactions */
(function () {
    "use strict";

    var doc = document;
    var body = doc.body;

    /* ---------- Header: solid on scroll + hide on scroll-down ---------- */
    var header = doc.querySelector("[data-header]");
    if (header) {
        var lastY = window.pageYOffset;
        var ticking = false;
        var update = function () {
            var y = window.pageYOffset;
            header.classList.toggle("is-solid", y > 40);
            if (!body.classList.contains("menu-open")) {
                if (y > lastY && y > 300) {
                    header.classList.add("is-hidden");
                } else {
                    header.classList.remove("is-hidden");
                }
            }
            lastY = y;
            ticking = false;
        };
        window.addEventListener(
            "scroll",
            function () {
                if (!ticking) {
                    window.requestAnimationFrame(update);
                    ticking = true;
                }
            },
            { passive: true }
        );
        update();
    }

    /* ---------- Mobile menu ---------- */
    var burger = doc.querySelector("[data-burger]");
    var menu = doc.querySelector("[data-mobile-menu]");
    if (burger && menu) {
        var setMenu = function (open) {
            body.classList.toggle("menu-open", open);
            burger.setAttribute("aria-expanded", open ? "true" : "false");
            if (open) {
                menu.hidden = false;
                requestAnimationFrame(function () {
                    menu.classList.add("is-open");
                });
                body.style.overflow = "hidden";
            } else {
                menu.classList.remove("is-open");
                body.style.overflow = "";
                setTimeout(function () {
                    if (!body.classList.contains("menu-open")) menu.hidden = true;
                }, 320);
            }
        };
        burger.addEventListener("click", function () {
            setMenu(!body.classList.contains("menu-open"));
        });
        menu.querySelectorAll("[data-menu-close]").forEach(function (el) {
            el.addEventListener("click", function () {
                setMenu(false);
            });
        });
        doc.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && body.classList.contains("menu-open")) setMenu(false);
        });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = doc.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        revealEls.forEach(function (el) {
            io.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    /* ---------- Testimonials slider dots ---------- */
    var slider = doc.querySelector("[data-slider]");
    if (slider) {
        var track = slider.querySelector("[data-slider-track]");
        var dotsWrap = slider.querySelector("[data-slider-dots]");
        var slides = track ? track.children : [];
        if (track && dotsWrap && slides.length) {
            for (var i = 0; i < slides.length; i++) {
                (function (idx) {
                    var dot = doc.createElement("button");
                    dot.className = "slider-dot" + (idx === 0 ? " is-active" : "");
                    dot.type = "button";
                    dot.setAttribute("aria-label", "Slide " + (idx + 1));
                    dot.addEventListener("click", function () {
                        slides[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    });
                    dotsWrap.appendChild(dot);
                })(i);
            }
            var dots = dotsWrap.children;
            var sTick = false;
            track.addEventListener(
                "scroll",
                function () {
                    if (sTick) return;
                    sTick = true;
                    requestAnimationFrame(function () {
                        var center = track.scrollLeft + track.clientWidth / 2;
                        var active = 0;
                        for (var k = 0; k < slides.length; k++) {
                            var s = slides[k];
                            if (s.offsetLeft <= center && s.offsetLeft + s.offsetWidth > center) {
                                active = k;
                                break;
                            }
                        }
                        for (var d = 0; d < dots.length; d++) {
                            dots[d].classList.toggle("is-active", d === active);
                        }
                        sTick = false;
                    });
                },
                { passive: true }
            );
        }
    }

    /* ---------- File input label ---------- */
    doc.querySelectorAll(".file-input").forEach(function (input) {
        input.addEventListener("change", function () {
            var nameEl = input.closest(".file-control").querySelector("[data-file-name]");
            if (nameEl && input.files && input.files.length) {
                nameEl.textContent = input.files[0].name;
            }
        });
    });

    /* ---------- Form validation + submit ---------- */
    var DICT = {
        cs: {
            name: "Zadejte prosím jméno.",
            phone: "Zadejte platné telefonní číslo.",
            email: "Zadejte platný e-mail.",
            consent: "Potvrďte prosím souhlas.",
            fileSize: "Soubor je příliš velký (max. 25 MB)."
        },
        uk: {
            name: "Вкажіть, будь ласка, ім'я.",
            phone: "Введіть коректний номер телефону.",
            email: "Введіть коректний e-mail.",
            consent: "Підтвердьте, будь ласка, згоду.",
            fileSize: "Файл завеликий (макс. 25 МБ)."
        }
    };
    var locale = body.getAttribute("data-locale") === "uk" ? "uk" : "cs";
    var msg = DICT[locale];

    var setError = function (form, key, text) {
        var slot = form.querySelector('[data-error="' + key + '"]');
        var field = form.querySelector('[name="' + key + '"]');
        if (slot) slot.textContent = text || "";
        if (field) {
            if (text) field.setAttribute("aria-invalid", "true");
            else field.removeAttribute("aria-invalid");
        }
    };

    var validate = function (form) {
        var ok = true;
        var name = (form.name && form.name.value ? form.name.value : "").trim();
        var phone = (form.phone && form.phone.value ? form.phone.value : "").trim();
        var emailEl = form.querySelector('[name="email"]');
        var email = emailEl ? emailEl.value.trim() : "";
        var consentEl = form.querySelector('[name="consent"]');
        var fileEl = form.querySelector('[name="file"]');

        setError(form, "name", name.length < 2 ? msg.name : "");
        if (name.length < 2) ok = false;

        var digits = phone.replace(/\D+/g, "");
        setError(form, "phone", digits.length < 9 ? msg.phone : "");
        if (digits.length < 9) ok = false;

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(form, "email", msg.email);
            ok = false;
        } else {
            setError(form, "email", "");
        }

        if (consentEl && !consentEl.checked) {
            setError(form, "consent", msg.consent);
            ok = false;
        } else {
            setError(form, "consent", "");
        }

        if (fileEl && fileEl.files && fileEl.files[0] && fileEl.files[0].size > 25 * 1024 * 1024) {
            ok = false;
            alert(msg.fileSize);
        }
        return ok;
    };

    doc.querySelectorAll(".js-form").forEach(function (form) {
        var genericErr = form.querySelector("[data-form-error]");
        var successBox = form.querySelector("[data-form-success]");
        var resetBtn = form.querySelector("[data-form-reset]");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (genericErr) genericErr.hidden = true;
            if (!validate(form)) {
                var bad = form.querySelector('[aria-invalid="true"]');
                if (bad) bad.focus();
                return;
            }
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { "X-Requested-With": "fetch", Accept: "application/json" }
            })
                .then(function (r) {
                    return r.json();
                })
                .then(function (data) {
                    if (submitBtn) submitBtn.disabled = false;
                    if (data && data.ok) {
                        form.querySelectorAll(".field, .form-grid, .consent, button[type='submit'], .field-error, .form-generic-error")
                            .forEach(function (el) {
                                if (!el.closest("[data-form-success]")) el.style.display = "none";
                            });
                        if (successBox) successBox.hidden = false;
                        form.scrollIntoView({ behavior: "smooth", block: "center" });
                    } else if (data && data.errors) {
                        Object.keys(data.errors).forEach(function (k) {
                            setError(form, k, data.errors[k]);
                        });
                    } else if (genericErr) {
                        genericErr.hidden = false;
                    }
                })
                .catch(function () {
                    if (submitBtn) submitBtn.disabled = false;
                    if (genericErr) genericErr.hidden = false;
                });
        });

        if (resetBtn) {
            resetBtn.addEventListener("click", function () {
                form.reset();
                if (successBox) successBox.hidden = true;
                form.querySelectorAll(".field, .form-grid, .consent, button[type='submit']").forEach(function (el) {
                    if (!el.closest("[data-form-success]")) el.style.display = "";
                });
                var nameEl = form.querySelector("[data-file-name]");
                if (nameEl) nameEl.textContent = nameEl.getAttribute("data-default") || nameEl.textContent;
            });
        }
    });
})();
