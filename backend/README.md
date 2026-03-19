## Task & Project Management Backend

Node.js/Express backend with PostgreSQL, JWT authentication, bcrypt password hashing, Swagger docs, and clean architecture (Controller → Service → Repository).

### Folder structure

- **config**: DB config (`db.js`)
- **controllers**: HTTP layer for each feature
- **services**: business logic per feature
- **repositories**: data access using `pg`
- **routes**: Express routers wired into `/api`
- **middleware**: auth and error handling
- **models**: simple entity classes
- **docs**: Swagger, SQL schema, Postman collection

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### Setup

1. **Install dependencies**

```bash
cd backend
npm install
```

2. **Configure environment**

Copy `.env.example` to `.env` and adjust values if needed:

```bash
cp .env.example .env
```

3. **Create database schema**

Create a database called `task_management` (or match `PGDATABASE` in `.env`), then run `docs/sql_schema.sql` against it, for example:

```bash
psql -U postgres -d task_management -f docs/sql_schema.sql
```

4. **Run the backend**

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### API docs (Swagger)

Visit:

- `http://localhost:5000/api-docs`

### Auth flow

1. `POST /api/auth/register` – create a user (e.g. Admin).
2. `POST /api/auth/login` – obtain a JWT.
3. Use `Authorization: Bearer <token>` for protected routes.

### Role-based access (examples)

- `Manager` / `Admin`: can create/update/delete projects and tasks.
- `User` / `Manager` / `Admin`: can view dashboards and tasks assigned to them.
- `Admin`: can list users and update roles.

### Postman collection

Import `docs/postman_collection.json` into Postman. Set the `token` variable to the JWT from the login response.

