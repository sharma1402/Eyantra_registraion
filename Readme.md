# eYantra Competition Registration

A full-stack competition registration app built for the e-Yantra "Web Work" screening
assignment — **Vue.js 3** on the frontend, **Node.js/Express** on the backend, and
**MySQL** for storage.

## Problem Statement 1 — Registration Page

A Vue.js form collecting: Country, College, Name, Contact Number, Gender, Email,
Year, Domain/Department, and a Register button.

- **Country / College** — populated from MySQL (`countries` / `colleges` tables), 20
  countries and 21 colleges seeded via `schema.sql`.
- **Name** — validated to contain only letters and spaces, both client- and
  server-side.
- **Contact Number** — validated as exactly 10 digits.
- **Email** — enforced unique at the database level (`UNIQUE` constraint), and
  verified via a one-time-password (OTP) flow before the form can be submitted.
- **Validation** happens twice: instantly in the browser (Vue), and again in Express
  before anything touches the database — so the API can't be bypassed by a raw
  request that skips the UI.
- **Submissions are recorded properly** in a `registrations` table with foreign keys
  back to `countries` and `colleges`.

### A note on "email verification"

There's no real email-sending service wired up here (that would need a paid SMTP
provider). The OTP flow is fully real and enforced — the form won't submit until
it's verified — but the OTP itself is returned in the API response and shown
on-screen labeled "Dev mode" instead of being emailed. Swapping in a real provider
(SendGrid, Amazon SES, Nodemailer) would only mean changing `otpService.js` on the
backend; nothing else in the app would need to change.

## Problem Statement 2 — View Page

A second page ("View Participants") lists registered users in a table, filterable
by **Country** and **College** dropdowns, matching the option described in the
problem statement.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vue 3 (Composition API, `<script setup>`), Vue Router, Vite |
| Backend | Node.js, Express |
| Database | MySQL (via `mysql2`) |
| Dev tooling | `concurrently` (runs both servers with one command) |

## Project Structure

```
eyantra_registration/
├── package.json              # root — only holds `concurrently` + the `dev` script
├── frontend/
│   ├── src/
│   │   ├── assets/            # shared CSS (tokens, .card, base styles)
│   │   ├── components/
│   │   │   ├── form/           # TextField, SelectField, RadioGroup — reusable inputs
│   │   │   ├── AppBanner.vue
│   │   │   ├── EmailVerificationField.vue
│   │   │   ├── OtpVerification.vue
│   │   │   ├── ParticipantFilter.vue
│   │   │   └── ParticipantsTable.vue
│   │   ├── composables/        # useRegistrationForm, useOtpVerification — stateful logic
│   │   ├── constants/          # formOptions.js — dropdown values + validation regex
│   │   ├── services/           # api.js — the only file that calls fetch()
│   │   ├── router/
│   │   ├── views/               # RegisterView.vue, ParticipantsView.vue
│   │   ├── App.vue              # nav bar + <RouterView>
│   │   └── main.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/db.js         # MySQL connection pool
│   │   ├── constants/formOptions.js
│   │   ├── controllers/         # request/response handling only
│   │   ├── services/            # all SQL queries + OTP logic live here
│   │   ├── routes/
│   │   ├── middleware/errorHandler.js
│   │   └── app.js               # Express app: middleware + route mounting
│   ├── server.js                # entry point — starts the HTTP server
│   ├── schema.sql
│   ├── .env.example
│   └── package.json
└── README.md
```

**Why layered this way:** on the frontend, components only render UI and emit
events — they don't know about the API. Composables hold reactive form/OTP logic
and are reusable independent of any component. `services/api.js` is the single
place that calls `fetch()`, so if the API shape changes, only one file needs
editing. The backend mirrors this with routes → controllers → services (classic
MVC): controllers handle `req`/`res` only, services own every SQL query and could
be reused outside of Express entirely (a script, a test, a CLI tool).

## Setup

### 1. Database

```bash
mysql -u root -p
```
Then inside the MySQL shell:
```sql
source backend/schema.sql;
```
This creates the `eyantra_registration` database, all three tables, and seeds the
country/college lists.

### 2. Backend config

```bash
cd backend
cp .env.example .env
```
Edit `.env` with your actual MySQL credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<your password>
DB_NAME=eyantra_registration
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Install dependencies

```bash
# from the project root
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 4. Run everything with one command

```bash
npm run dev
```
This uses `concurrently` to start the Express backend (`:3000`) and the Vite dev
server (`:5173`) together in one terminal. Open **http://localhost:5173**.

(To run them separately instead: `npm start --prefix backend` and
`npm run dev --prefix frontend` in two terminals.)

## API Endpoints

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/countries` | List of countries for the dropdown |
| GET | `/api/colleges` | List of colleges for the dropdown |
| GET | `/api/meta` | Years, domains, genders |
| GET | `/api/check-email?email=` | Check if an email is already registered |
| POST | `/api/send-otp` | Generate and return a dev-mode OTP |
| POST | `/api/verify-otp` | Verify an OTP against an email |
| POST | `/api/register` | Validate + insert a new registration |
| GET | `/api/registrations?country=&college=` | List registrations, optionally filtered |

## Design Decisions Worth Knowing

- **X = 20 countries, 21 colleges** — the problem statement left "X" undefined, so
  a representative seed list was chosen and stored in MySQL rather than hardcoded
  in the frontend, so it's driven by the database like the rest of the data.
- **Validation duplicated between frontend and backend** — intentional, not an
  oversight. The frontend copy gives instant UI feedback; the backend copy is what
  actually protects data integrity, since any client-side check can be bypassed by
  a direct API request.
