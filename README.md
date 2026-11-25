# Trini Trails — CPTR331 Assignment 5

Six-page responsive travel site (Home, Destinations, Food, Culture, Gallery, Contact). Personal project, all code and images original; demo text is lorem ipsum.

## Stack
- Semantic HTML5, vanilla JavaScript (no jQuery)
- **Tailwind CSS v4 (CLI)** – source in `css/src/` (input.css, base.css, components.css); compiled to `css/style.css`
  `npx @tailwindcss/cli -i css/src/input.css -o css/style.css --minify`
- Google Fonts: Playfair Display + Nunito (non-blocking load)

## CDN / hosting (Netlify)
- Provider: Netlify (global edge CDN). Deploy by dragging this folder (index.html at root) or connecting the GitHub repo.
- `_headers`: `/css/*`, `/js/*`, `/img/*` → `Cache-Control: public, max-age=31536000, immutable`; HTML → `max-age=0, must-revalidate`; plus security headers.
- Asset versioning: `?v=1.0.0` on CSS/JS; bump when files change.
- 

## Performance
- WebP images with `srcset`/`sizes`, explicit width/height, `loading="lazy"`, `fetchpriority="high"` on the hero
- `js/gallery.js` is injected only when the gallery nears the viewport (IntersectionObserver); other scripts use `defer`
- Lighthouse (local, mobile emulation, Lighthouse CLI): Performance 100, Accessibility 100, Best Practices 96, SEO 100; FCP 1.0 s, LCP 1.6 s, TBT 0 ms, CLS 0 (home page).
- Live (Netlify CDN, WebPageTest desktop): TTFB 288 ms, FCP/LCP 0.754 s, TBT 0, CLS 0.034, CDN detected on all first-party requests. Full report in the documentation PDF.

## Accessibility
Skip link, landmarks (`header/nav/main/footer`), `aria-label`, `aria-expanded` menu toggle, `aria-live` result counts, `<dialog>` lightbox with keyboard support, `aria-invalid`/`aria-describedby` form errors, descriptive alt text, visible focus, AA contrast.

## SEO
Unique title/description and canonical per page, Open Graph tags, JSON-LD (WebSite), clean file names, one h1 per page, `robots.txt`, `sitemap.xml`.

## Validation
All six pages pass the W3C Nu HTML Checker with 0 errors/warnings.
