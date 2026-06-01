# TARIK Invest — deploy (static PHP/HTML)

Production-ready static site generated from the Next.js source on `main`.
The repository **root is the web root** (`public_html`).

## Structure
- `index.php` — Czech homepage (default)
- `uk/index.php` — Ukrainian homepage
- `privacy.php`, `uk/privacy.php` — privacy pages
- `submit.php` — lead + careers form handler (PHP `mail()` + local log fallback)
- `lib/` — render functions + content bundles (`cs.json`, `uk.json`)
- `assets/` — css, js, images, hero video
- `uploads/` — form submission log (not web-accessible)

## Hostinger deployment
1. hPanel → Zaawansowane → GIT → set **branch = `deploy`**, path = empty (public_html).
2. `public_html` must be empty before deploy.
3. Requires PHP 7.4+ (no Composer / Node needed).

Form submissions are emailed to `tarikinvest009@gmail.com` and also appended to
`uploads/submissions.log` as a fallback.
