# Ravatek

A production-ready bilingual marketing site for Ravatek built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and the Google AI Studio (Gemini) API.

## Features

- 🌐 Full bilingual support (English & Persian) with locale-aware routing via `next-intl`
- 🌓 Accessible dark/light mode with system preference detection
- 🌌 Animated Three.js hero background optimised for performance
- ✨ shadcn/ui-inspired component primitives with Tailwind CSS + RTL support
- 📚 Prisma-backed blog with automatic Gemini-powered post generation twice per day
- 🧠 Manual generation API plus cron-based automation via `node-cron`
- 🛡️ SEO-friendly metadata powered by `next-seo`, plus sitemap/robots
- 🧩 Markdown blog rendering with syntax highlighting

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   # or npm install / yarn install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and adjust values for your environment:

   ```bash
   cp .env.example .env.local
   ```

   - `DATABASE_PROVIDER` can be `sqlite` (default) or `postgresql`
   - `DATABASE_URL` should match the Prisma datasource connection string
   - `GOOGLE_API_KEY` is required for Gemini API access
   - Optionally override `GEMINI_ENDPOINT`, `CRON_SCHEDULE`, or set `DISABLE_AUTOMATION=true` to turn off node-cron

3. **Prepare the database**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to explore the site.

5. **Trigger blog generation manually**

   Use the built-in API endpoint to trigger a manual generation cycle:

   ```bash
   curl -X POST http://localhost:3000/api/blog/generate
   ```

## Scripts

- `pnpm dev` – start Next.js in development mode
- `pnpm build` – create an optimised production build
- `pnpm start` – start the production server
- `pnpm lint` – run ESLint
- `pnpm format` – format with Prettier

## Project Structure

```
app/
  [locale]/
    page.tsx
    layout.tsx
    blog/
      page.tsx
      [slug]/page.tsx
  api/
    blog/
      generate/route.ts
      latest/route.ts
components/
  SceneCanvas.tsx
  Navbar.tsx
  Footer.tsx
  ...
lib/
  ai.ts
  cron.ts
  db.ts
  posts.ts
  slugify.ts
messages/
  en.json
  fa.json
prisma/
  schema.prisma
```

## Cron & Background Jobs

The application registers a Node cron job (`lib/cron.ts`) that runs twice per day (09:00 and 18:00 server time) to request one Persian and one English article from Gemini. Each article is parsed and saved into the Prisma database.

In serverless or edge deployments, replace the cron module with the target platform's scheduler (e.g., Vercel Cron, Cloudflare Workers). The API endpoint at `/api/blog/generate` can be invoked by external schedulers as well.

## Deployment Notes

- Configure the Prisma datasource for your production database (SQLite for demos or PostgreSQL for production)
- Ensure the `GOOGLE_API_KEY` secret is set in your hosting provider
- When deploying on Vercel, add a cron job hitting `/api/blog/generate`
- Remember to run `prisma migrate deploy` on the production database

## License

MIT © Ravatek
