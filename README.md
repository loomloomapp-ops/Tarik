# TARIK Invest — static deploy (Next.js production build)

This branch is the **real Next.js production build** exported as flat files for
Apache shared hosting (Hostinger, no Node). The repository root is the web root
(`public_html`).

- `index.html` — Czech homepage (served at `/`)
- `uk/index.html` — Ukrainian homepage (served at `/uk`)
- `ochrana-osobnich-udaju/`, `uk/ochrana-osobnich-udaju/` — privacy pages
- `_next/static/` — hashed JS, CSS and self-hosted fonts (immutable, long-cache)
- `images/`, `hero.mp4`, `logo*.png` — media at site root
- `api/submit.php` — lead + careers form handler (PHP mail + local log)
- `nav-fix.js` — forces real navigation for cross-page links + language switch
  (the Next client router cannot fetch RSC on a static host)
- `.htaccess` — form rewrites, caching, gzip

Regenerated from `main` via `next build` with `images.unoptimized = true`.
Requires PHP 7.x+ only. To refresh after content/design changes on `main`,
rebuild and re-export this branch.
