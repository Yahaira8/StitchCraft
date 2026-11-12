# Running StitchCraft

The current application uses Next.js. The older Vite files are retained but are not the preview entry point.

- Run the **Start application** workflow (`npm run dev`).
- The preview listens on `0.0.0.0:5000`.
- Run `npm run lint` to check TypeScript.
- Run `npm run build` to create a production build.

The public home page can preview without Supabase credentials. Database-backed features require a real Supabase project and the environment variables documented in `.env.example`.
