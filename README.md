<h1 align="center">Quiz Application</h1>

## Development

#### Dependencies

- Node.js >=18 and npm
- PostgreSQL >= 15

#### Install dependencies

```
npm install
```

#### Setup environment

Create `.env` file in backend app.

Required variables for `.env` file:

- `JWT_SECRET`
- `DATABASE_URL`

#### Run database migrations

```
npx prisma migrate dev
```

#### Run database seed

```
npx prisma db seed
```

#### Run app

```
npm run dev
```

App is now accessible on <http://localhost:5173/>. API routes are prefixed with `/api`.
