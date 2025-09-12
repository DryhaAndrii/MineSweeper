# MineSweeper Docker Setup

This project is configured to run in Docker containers.

## Structure

- `server/` - NestJS backend
- `client/` - React frontend (not in Docker)
- `docker-compose.yml` - Docker Compose configuration
- `docker.env` - Environment variables for Docker

## Running

### 1. Start backend and database in Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 2. Start frontend (locally)

```bash
cd client
npm install
npm run dev
```

## Ports

- Backend: http://localhost:3002
- PostgreSQL: localhost:5433 (external port)
- Frontend: http://localhost:5173

## Environment Variables

Main variables are in `docker.env` file:

- `NODE_ENV=production`
- `PORT=3002`
- `CLIENT=http://localhost:5173`
- `DB_URL=postgres://postgres:password@postgres:5432/mineSweeper`

## Database

PostgreSQL is automatically created on first run with:

- Database: `mineSweeper`
- User: `postgres`
- Password: `password`

## Useful Commands

```bash
# Rebuild containers
docker-compose up --build

# View container status
docker-compose ps

# Connect to database
docker-compose exec postgres psql -U postgres -d mineSweeper

# View logs for specific service
docker-compose logs backend
docker-compose logs postgres
```
