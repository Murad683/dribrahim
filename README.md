# Dr. Ibrahim

Medical professional portfolio and admin dashboard for managing public-facing clinic content.

The project is split into:
- a `React + TypeScript` frontend for the public website and admin panel
- a `Spring Boot` backend secured with JWT for admin operations
- a `PostgreSQL` database running in Docker

## Overview

The public site presents Dr. Ibrahim's services, profile, and treatment cases.  
The admin dashboard allows authenticated content management for:
- Services
- Doctor Profile
- Treatment Cases / Gallery

Admin changes are persisted in PostgreSQL and reflected on the public site through live API-driven pages.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- React Hook Form
- Zod
- Framer Motion
- Sonner

### Backend
- Java 21
- Spring Boot 3.5.x
- Spring Web
- Spring Data JPA / Hibernate
- Spring Security with JWT
- Bean Validation
- Lombok

### Database
- PostgreSQL 16 via Docker Compose

## Architecture

### Runtime Ports

| Service | Port | Notes |
| --- | --- | --- |
| Frontend | `5173` | Vite dev server |
| Backend | `8080` | Spring Boot API |
| Database | `5433` | Host port mapped to PostgreSQL container `5432` |

### Request Flow

1. The public frontend fetches content from the Spring Boot API.
2. Admin users log in through `/api/auth/login` and receive a JWT token.
3. The frontend stores the token in `localStorage` and sends it in the `Authorization` header for admin requests.
4. Spring Security protects `/api/admin/**` routes and allows public `GET` routes for visitor pages.
5. Hibernate persists content into PostgreSQL.

## Project Structure

```text
dr-ibrahim/
|-- docker-compose.yml
|-- README.md
|-- frontend/
|   |-- src/
|   |-- package.json
|   |-- vite.config.ts
|   `-- playwright.config.ts
`-- backend/
    `-- backend/
        |-- src/main/java/
        |-- src/main/resources/application.yml
        |-- build.gradle
        |-- gradlew
        `-- gradlew.bat
```

Note: the Spring Boot application lives in `backend/backend/`. Commands below use that path.

## Prerequisites

- Docker Desktop or Docker Engine with Compose
- Java 21
- Node.js 20+ and npm

## Local Development Setup

### 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

If your environment still uses the legacy command:

```bash
docker-compose up -d
```

This starts PostgreSQL with:
- Database: `dribrahim_db`
- User: `admin`
- Password: `password123`
- Host port: `5433`

### 2. Run the Backend

Open a terminal in `backend/backend`:

```bash
./gradlew bootRun
```

On Windows PowerShell:

```powershell
.\gradlew.bat bootRun
```

The backend will start on:

```text
http://localhost:8080
```

### 3. Run the Frontend

Open a terminal in `frontend`:

```bash
npm install
npm run dev
```

The frontend will start on:

```text
http://localhost:5173
```

## Local Development Credentials

### Admin Login

- Username: `admin`
- Password: `admin`

### Database Defaults

- Host: `localhost`
- Port: `5433`
- Database: `dribrahim_db`
- Username: `admin`
- Password: `password123`

### JWT Defaults

- Secret: `dribrahim-super-secret-key-please-change-in-production-2026`
- Expiration: `86400000` ms

These values are development defaults and should be replaced for any non-local environment.

## Configuration Reference

### Frontend

The frontend API client defaults to:

```text
http://localhost:8080
```

Optional environment override:

```text
VITE_API_URL=http://localhost:8080
```

### Backend

The backend reads the following environment variables from `application.yml` defaults:

| Variable | Default |
| --- | --- |
| `SERVER_PORT` | `8080` |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5433` |
| `DB_NAME` | `dribrahim_db` |
| `DB_USERNAME` | `admin` |
| `DB_PASSWORD` | `password123` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `admin` |
| `JWT_SECRET` | `dribrahim-super-secret-key-please-change-in-production-2026` |
| `JWT_EXPIRATION_MS` | `86400000` |

## Security Notes

- `POST /api/auth/login` is public and returns a JWT on successful login.
- Public visitor content is available through read-only `GET` endpoints such as:
  - `/api/services`
  - `/api/cases`
  - `/api/profile`
- Admin content management routes under `/api/admin/**` require a valid JWT.

## Development Notes

- Vite is configured to run on port `5173`.
- Spring Boot is configured to run on port `8080`.
- Spring Security CORS is configured to allow requests from:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
- PostgreSQL data is persisted in the Docker volume `dribrahim_postgres_data`.

## Quick Start Summary

From the project root and two terminals:

```bash
docker compose up -d
```

```bash
cd backend/backend
./gradlew bootRun
```

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

Use `admin / admin` to access the admin dashboard locally.
