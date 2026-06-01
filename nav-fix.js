/* Static-host navigation shim.
   The site is the real Next.js build served as flat files on Apache (no Node).
   Next's client router would try to fetch RSC payloads for page-to-page
   navigation, which do not exist on a static host. This forces a real browser
   navigation for cross-page links and the language switcher, while leaving
   same-page hash links (smooth scroll) to the app. */
(function () {
    "use strict";

    function bare() {
        var p = location.pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "");
        p = p.replace(/^\/uk(?=\/|$)/, "");
        return p === "" ? "/" : p;
    }

    function norm(path) {
        return path.replace(/\/+$/, "") || "/";
    }

    document.addEventListener(
        "click",
        function (e) {
            // Language switcher: <div role="group"> ... <button>CS</button><button>UK</button>
            var btn = e.target.closest('div[role="group"] button');
            if (btn) {
                var label = (btn.textContent || "").trim().toUpperCase();
                var b = bare();
                var target;
                if (label === "UK") target = "/uk" + (b === "/" ? "" : b);
                else if (label === "CS") target = b;
                else return;
                e.preventDefault();
                e.stopPropagation();
                if (norm(location.pathname) !== norm(target)) location.assign(target);
                return;
            }

            // Internal anchor links
            var a = e.target.closest("a[href]");
            if (!a) return;
            var href = a.getAttribute("href");
            if (!href || href.charAt(0) !== "/") return; // external / relative
            if (href.indexOf("/_next/") === 0) return; // asset
            if (/\.(png|jpe?g|svg|webp|gif|mp4|pdf|ico)$/i.test(href)) return; // file

            var url = new URL(href, location.href);
            // Pure same-page hash link -> let the app smooth-scroll.
            if (url.hash && norm(url.pathname) === norm(location.pathname)) return;
            // Cross-page navigation -> force a real load.
            if (norm(url.pathname) !== norm(location.pathname)) {
                e.preventDefault();
                e.stopPropagation();
                location.assign(href);
            }
        },
        true
    );
})();
