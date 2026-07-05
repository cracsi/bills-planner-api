# Bills Planner — API

Backend for **Bills Planner**, a personal bill-tracking app. Users register
recurring bills (`Facturas`) with a monthly due date, log payments against
them (`Pagos`, via saved `CuentasDePago`), and get notified via recurring
reminders (`Recordatorios`) as the due date approaches.

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

Early scaffold. DB config is in place; entities have not yet been updated to
match the current data model below (still reflect an earlier iteration —
`Usuario`/`Factura` only, no `Pago`, `MetodoDePago`, `CuentaDePago`, or
`Recordatorio` yet). Auth, CRUD endpoints, and the reminder scheduler are
being built next.

## Data model (v1)

Entities are named in Spanish, matching the product's user-facing language.

```
Usuario

id (uuid, pk)
nombre
email (unique)
passwordHash
createdAt

Factura

id (uuid, pk)
usuarioId (fk -> Usuario)          [1 Usuario -> 0..* Factura]
nombre
valor (float)
descripción
linkPago (optional)
instruccionesPago (optional)
pagado (boolean)                   — cycle-scoped; only ever written by
the scheduler/payment logic, never
directly editable via the API
diaVencimiento (int)               — day of month the bill is due (recurs
monthly, e.g. 15)
fechaVencimiento (date)            — cached/derived from diaVencimiento;
recomputed by the scheduler each cycle
diaSuspension (int)                — days after due date until suspension
fechaSuspension (date)             — cached/derived, same pattern as above
createdAt

Pago                                  [1 Factura -> 0..* Pago]

id (uuid, pk)
facturaId (fk -> Factura)
cuentaDePagoId (fk -> CuentaDePago) [1 CuentaDePago -> 0..* Pago]
valor (float)
fecha (date)

MetodoDePago                          — shared global catalog (e.g. "efectivo",
"transferencia"), not per-user

id (uuid, pk)
nombre
tipo

CuentaDePago                          — a user's specific instance of a
payment method (e.g. "Cuenta
Bancolombia"); references the global
catalog rather than inheriting from it

id (uuid, pk)
usuarioId (fk -> Usuario)           [1 Usuario -> 0..* CuentaDePago]
metodoPagoId (fk -> MetodoDePago)   [1 MetodoDePago -> 0..* CuentaDePago]
alias
datos

Recordatorio                          [1 Factura -> 0..* Recordatorio]

id (uuid, pk)
facturaId (fk -> Factura)
diasAntes (int)                     — recurring offset: fires every cycle,
N days before the due date
mensaje
```

<img width="1465" height="1108" alt="image" src="https://github.com/user-attachments/assets/3ca2b64b-1780-4769-9e99-5f762015b782" />


### Design notes

- `Factura` is a **persistent, recurring record** — it is not recreated each
  billing cycle. Fields like `fechaVencimiento` and `fechaSuspension` are
  therefore not stored as fixed one-time dates; they're cached values derived
  from `diaVencimiento` / `diaSuspension`, refreshed automatically by the
  scheduler every cycle. The `diaX` fields are the actual source of truth.
- `Pago` is an append-only **log**, not a 1:1 payment record — a `Factura` can
  accumulate many `Pago` rows over time (its full payment history). Whether a
  bill is "paid" for the *current* cycle is reflected in `Factura.pagado`,
  which the scheduler/payment logic keeps in sync — it is intentionally not
  left to the client to set directly, to avoid it drifting out of sync with
  the actual `Pago` history.
- `Recordatorio` also recurs: it's a rule ("remind me N days before due date"),
  not a one-time reminder that has to be manually recreated each cycle.
- `CuentaDePago` references `MetodoDePago` via a foreign key (association),
  not inheritance — a saved account "has a" payment method type, it isn't "a
  kind of" one.

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

- [ ] Update entities to match the current data model (`Pago`, `MetodoDePago`,
      `CuentaDePago`, `Recordatorio`; rename/fix fields on `Factura`)
- [ ] Custom JWT auth (register/login, password hashing)
- [ ] `Factura` CRUD endpoints, scoped per authenticated user
- [ ] `Pago` logging endpoints
- [ ] `CuentaDePago` CRUD (per-user saved payment accounts)
- [ ] Reminder + recurrence scheduler (`@nestjs/schedule`): resets `pagado`,
      refreshes `fechaVencimiento`/`fechaSuspension`, fires `Recordatorio`
      reminders, and sends emails via Resend
- [ ] Migrations (replacing `synchronize: true`)
- [ ] Deployment to Railway

## Future ideas (not in v1 scope)

- AI-based receipt scanning to auto-fill bill details from an uploaded image
