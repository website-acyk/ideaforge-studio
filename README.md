# IdeaForge Studio — Website

Where Ideas Become Websites.

A responsive, single-page marketing site for IdeaForge Studio, a small
development studio. Built with plain HTML/CSS/JS — no build step required.

## Structure

- `index.html` — all page content and sections
- `assets/css/style.css` — styles, design tokens, responsive layout
- `assets/js/main.js` — nav, mobile menu, scroll reveal, FAQ accordion, cursor glow
- `assets/img/` — portfolio screenshots (CJ Klinik, reset.matcha)

## Running locally

Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Any static host works (Cloudflare Pages, Netlify, Vercel, GitHub Pages). No
build step — deploy the folder as-is.
