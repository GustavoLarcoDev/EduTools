# EduTools — frontend

Next.js 15 (App Router) + TypeScript + Tailwind CSS client for the EduTools Django API.

```bash
npm install
npm run dev          # API mode (NEXT_PUBLIC_API_URL, default http://localhost:8000/api)
npm run dev:demo     # demo mode with bundled sample data, no backend
npm run build:demo   # static export for GitHub Pages, copied to ../docs
```

All data access goes through `src/lib/api.ts`, which re-exports either the Axios client (`http-api.ts`) or the in-browser demo implementation (`demo-api.ts`) depending on `NEXT_PUBLIC_DEMO`.

See the [root README](../README.md) for architecture, setup and screenshots.
