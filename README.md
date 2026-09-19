# leonardonjoro

Personal portfolio website for **Leonard Onjoro**, an agriculture professional.
Built with Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion, ready to be published to GitHub Pages.

## Local development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npm run build
```

## Editing the content

- All page content lives in `src/pages/HomePage.tsx` (hero, about/CV, services, projects, contact).
- Header and footer are in `src/components/layout/`.
- Colours and animations are in `src/styles/global.css`.

## Adding Leonard's photo

The home portrait uses `public/images/leonard1.png`; the About portrait uses the lighter `public/images/leonard.jpeg`. Portrait orientation works best.

## CV and analytics

- The downloadable CV is `public/resume/leonard-onjoro-cv.md`.
- Analytics is optional. Copy `.env.example` to `.env` and set `VITE_GA_MEASUREMENT_ID` to enable Google Analytics 4. Contact form success events are tracked as `contact_form_success`.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co). The first time a message is sent, FormSubmit emails
`leonardonjoro@gmail.com` an activation link; click it once and messages will start arriving.

## GitHub Pages deployment

This project includes a GitHub Actions workflow for deployment to GitHub Pages.

1. Create a new GitHub repository named `leonardonjoro`.
2. Push this project to the `main` branch.
3. In GitHub, open the repository settings and enable GitHub Pages using the GitHub Actions option.
4. The deployment workflow will build and publish the site automatically.

The Vite base path is configured for a repository named `leonardonjoro` (see `vite.config.ts`).
