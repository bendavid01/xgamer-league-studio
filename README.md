# X-Gamer Pro League — Content Studio

The headless CMS backend for X-Gamer Pro League, built with **Sanity Studio**. This repo manages all structured content for the league — matches, standings, team data, rules, and announcements.

**Frontend repo:** [xgamer-league-web](https://github.com/bendavid01/xgamer-league-web)

---

## Tech Stack

| Layer | Tool |
|---|---|
| CMS Platform | Sanity Studio v3 |
| Language | TypeScript |
| Schema | Custom content types (schemaTypes) |
| API | Sanity GROQ + Content Lake |

---

## What This Repo Does

This studio provides a structured, real-time content editing environment connected to the Sanity backend. Editors can:

- Add and update **match results and schedules**
- Manage **team standings and stats**
- Post **community updates and announcements**
- Edit **league rules**

All content is consumed by the frontend via GROQ queries through the Sanity client.

---

## Project Structure

```
schemaTypes/    → Content type definitions (matches, teams, standings, rules, etc.)
actions/        → Custom Sanity actions
static/         → Static assets for the studio
sanity.config.ts → Studio configuration (project ID, dataset, plugins)
sanity.cli.ts   → CLI configuration
```

---

## Architecture

This repo is the **backend half** of a two-repo setup:

- **This repo** — Sanity Studio (content management)
- **[xgamer-league-web](https://github.com/bendavid01/xgamer-league-web)** — Next.js frontend that consumes this content

---

## What I Learned

- Defining custom content schemas in Sanity using TypeScript
- Understanding how a headless CMS separates content from presentation
- Connecting a CMS backend to a Next.js frontend via GROQ queries
- Managing a multi-repo project where frontend and backend are independent

---

## Local Setup

```bash
git clone https://github.com/bendavid01/xgamer-league-studio
cd xgamer-league-studio
npm install
npm run dev
```

> You will need a Sanity account and project. Update `sanity.config.ts` with your `projectId` and `dataset`.

---

*Part of the X-Gamer Pro League project — a personal full-stack build using Next.js and Sanity CMS.*
