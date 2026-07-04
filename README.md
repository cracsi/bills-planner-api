# Bills Planner — API

Backend for **Bills Planner**, a simple personal bill-tracking app. Users register
bills with a due date and a reminder date, and get notified as the reminder date
approaches.

This is the backend half of a two-repo project. Frontend lives in a separate
`bills-planner-web` repo (Next.js).

## Stack

- **NestJS 11** (TypeScript)
- **TypeORM 1.0** + **PostgreSQL**
- **class-validator** / **class-transformer** for request validation
- Custom JWT-based auth (no third-party auth provider — implemented from scratch)
- **Resend** for transactional email
- Scheduled reminder checks via NestJS's `@nestjs/schedule` (added once the reminders
  feature is built)

## Project status

Early scaffold. Core entities (`User`, `Bill`) and DB config are in place. Auth,
bill CRUD endpoints, and the reminder scheduler are being built next.

## Data model (v1)

```
User
- id (uuid, pk)
- name
- email (unique)
- passwordHash
- createdAt / updatedAt

Bill
- id (uuid, pk)
- userId (fk -> User)
- name
- value
- dueDate
- reminderDate
- status (pending | paid)
- createdAt / updatedAt
```

## Getting started

### 1. Start Postgres locally (via Docker)

```bash
docker compose up -d
```

This starts a Postgres 16 container matching the defaults in `.env.example`.

### 2. Configure environment

```bash
cp .env.example .env
```

Adjust values if needed — defaults match the `docker-compose.yml` service.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

```bash
npm run start:dev
```

The API starts on `http://localhost:3000` by default.

> **Note:** `DB_SYNCHRONIZE=true` in `.env.example` is convenient for local
> development (auto-creates tables from entities) but is not safe for anything
> resembling production data. Migrations will replace this before any real
> deployment.

## Scripts

| Command              | Description                          |
|-----------------------|--------------------------------------|
| `npm run start:dev`   | Start in watch mode                  |
| `npm run build`       | Compile TypeScript                   |
| `npm run test`        | Run unit tests                       |
| `npm run test:e2e`    | Run end-to-end tests                 |
| `npm run lint`        | Lint and autofix                     |

## Roadmap (not yet built)

- [ ] Custom JWT auth (register/login, password hashing)
- [ ] Bill CRUD endpoints, scoped per authenticated user
- [ ] Reminder scheduler (`@nestjs/schedule`) + Resend email integration
- [ ] Migrations (replacing `synchronize: true`)
- [ ] Deployment to Railway

## Future ideas (not in v1 scope)

- AI-based receipt scanning to auto-fill bill details from an uploaded image
