# TypeScript REST API with PostgreSQL & TypeORM

A RESTful API built with TypeScript, Express 5, TypeORM, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js with [tsx](https://github.com/privatenumber/tsx)
- **Language:** TypeScript (strict mode)
- **Framework:** Express 5
- **ORM:** TypeORM
- **Database:** PostgreSQL 17
- **Validation:** express-validator
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Testing:** Jest + Supertest

## Prerequisites

- Node.js (v20+)
- Docker & Docker Compose
- npm

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 17 instance on port `5432` using the credentials from `.env`.

### 3. Configure environment

Edit `.env` with your database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=restapi
PORT=3000
```

### 4. Run the server

```bash
npm run dev
```

The server starts at `http://localhost:3000` with hot-reload via nodemon.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot-reload |
| `npm start` | Start production server |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run typecheck` | Run type checking (source + tests) |
| `npm test` | Run tests with Jest |
| `npm run typeorm` | Run TypeORM CLI commands |

## API Endpoints

### Users

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/users` | List all users | - |
| `GET` | `/users/:id` | Get a user by ID | - |
| `POST` | `/users` | Create a user | `{ firstName, lastName, age }` |
| `DELETE` | `/users/:id` | Delete a user | - |

### Request Validation

**POST `/users`** requires:
- `firstName` — string (required)
- `lastName` — string (required)
- `age` — integer ≥ 0

**GET/DELETE `/users/:id`** requires:
- `id` — integer

### Example

```bash
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","age":30}'

# List all users
curl http://localhost:3000/users
```

## Project Structure

```
├── __tests__/
│   └── acceptance/
│       └── users.test.ts      # API acceptance tests
├── src/
│   ├── config/
│   │   └── data-source.ts     # TypeORM DataSource configuration
│   ├── controller/
│   │   └── UserController.ts  # User CRUD handlers
│   ├── entity/
│   │   └── User.ts            # User entity definition
│   ├── middleware/             # Custom middleware (empty)
│   ├── routes/
│   │   └── routes.ts          # Route definitions & validation
│   ├── app.ts                 # Express app setup & middleware
│   └── index.ts               # Entry point (DB connect + server start)
├── docker-compose.yml         # PostgreSQL container
├── jest.config.mjs            # Jest configuration
├── jest-transform.cjs         # esbuild transform for Jest
├── tsconfig.json              # TypeScript config (source)
└── tsconfig.test.json         # TypeScript config (tests)
```

## Database

The database schema is synchronized automatically by TypeORM (`synchronize: true`). The `User` table is created with columns:

| Column | Type | Notes |
|---|---|---|
| `id` | `int` | Primary key, auto-generated |
| `firstName` | `varchar` | Required |
| `lastName` | `varchar` | Required |
| `age` | `int` | Required |

> **Note:** `synchronize: true` is suitable for development only. For production, use TypeORM migrations instead.

## Testing

```bash
npm test
```

Tests require a running PostgreSQL instance (uses the same `.env` credentials). Jest uses esbuild to transform TypeScript with decorator support.

## License

ISC
