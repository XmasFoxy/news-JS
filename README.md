# News Portal

A TypeScript news reader built with Webpack. Browse news sources and read their latest articles.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `API_URL` and, when needed, `API_KEY`.
3. Start the development server with `npm start`.

The example environment uses the proxy's static mock endpoints, so it works without an API key. To use live News API data, set `API_URL` to `https://rss-news-api.onrender.com/` and provide a News API key. For local requests directly to News API, use `https://newsapi.org/v2/`.

Never commit `.env` or publish an API key in a public repository.

## Commands

- `npm run lint` checks the TypeScript sources with ESLint.
- `npm run build` creates the production site in `dist/`.
- `npm run deploy` builds the site and publishes `dist/` to the `gh-pages` branch. Configure the deployment environment before publishing.

## Implementation

The application uses strict TypeScript types for News API responses and validates the data before rendering. The interface adapts from mobile screens (320px) through desktop widths.
