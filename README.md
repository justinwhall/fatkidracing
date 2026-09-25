# Fatkid Racing

One-page retrowave site for [fatkidracing.party](https://fatkidracing.party). Mock merch only — no checkout yet.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm test
npm run build
```

## Deploy on Vercel

1. Push this repo to GitHub / GitLab / Bitbucket.
2. In Vercel: **Add New… → Project** and import the repo. Framework preset: Next.js. The contact form uses a public Web3Forms access key in the client (required by their free plan). Mail goes to whatever inbox you registered the key with.
3. After the first deploy, open the project → **Settings → Domains** and add `fatkidracing.party` (and `www` if you use it).
4. In your domain registrar, add the DNS records Vercel shows (usually an A record to `76.76.21.21` and/or a CNAME for `www`).

Shopify keys in `.env.example` are placeholders for a later Storefront hookup. Do not add a live SDK until the catalog is real.
