# X-Gamer Pro League — Content Studio

The headless CMS backend for X-Gamer Pro League, built with **Sanity Studio**. This repo is the Content Manager (CM) for existing season matches, team data and editorial content. Organizer Manager (OM) handles private registration and tournament operations separately.

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

## Phase 1: CM and OM boundaries

CM is the Sanity editorial workspace. Keep existing documents, season logic and audit records here. The separately authenticated OM route in the cloud-hosted web app manages applications, verification, operational announcements, tournament actions and scoped roles. It does not run on a personal laptop. Current operational announcements are stored in PostgreSQL and displayed by the web app; adding or publishing content in Sanity does not automatically create those announcements.

The OM link still targets the existing production address. This review branch does not deploy or enable that service. Review the web Phase 1 branch and configure a safe preview before production promotion. Sanity membership does not grant OM access. Two main admins and coordinator permissions are enforced by OM independently of Sanity roles. Studio permissions and webhook audit delivery still require service-level verification before granting coordinators write access.
