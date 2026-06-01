# TARIK Invest — static deploy (Next.js production build)

Real Next.js production build exported as flat files for Apache shared hosting
(Hostinger, no Node). Repository root is the web root (`public_html`).

- `index.html` (/), `uk/index.html` (/uk) — prerendered pages (all latest edits)
- premium brand preloader (energize sweep) runs once per session
- `_next/static/` — hashed JS/CSS + self-hosted Inter Tight fonts
- `images/`, `hero.mp4`, `logo*.png` — media at site root
- `api/submit.php` — lead + careers handler (/api/lead, /api/career via .htaccess)
- `nav-fix.js` — forces real navigation for cross-page links + language switch
- `.htaccess` — form rewrites, caching, gzip

Header/footer/mobile nav use in-page `#anchor` links (locale-safe). Rebuilt from
`main` with `images.unoptimized = true`. Requires PHP 7.x+ only.
