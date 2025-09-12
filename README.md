# MineSweeper Game

A modern Minesweeper game built with React and NestJS.

## Demo

Live demo: https://minesweeper-client.netlify.app/

## Features

- Modern dark theme UI
- Three difficulty levels (Easy, Medium, Hard)
- Records tracking system
- Responsive design
- Docker support for backend

## Tech Stack

### Frontend

- React 18
- TypeScript
- SCSS
- Redux Toolkit
- Vite

### Backend

- NestJS
- PostgreSQL
- TypeScript

## Quick Start

### Using Docker (Recommended)

1. Start backend and database:

```bash
docker-compose up -d
```

2. Start frontend:

```bash
cd client
npm install
npm run dev
```

### Manual Setup

1. Start PostgreSQL database
2. Start backend:

```bash
cd server
npm install
npm run start:dev
```

3. Start frontend:

```bash
cd client
npm install
npm run dev
```

## Ports

- Backend: http://localhost:3002
- Frontend: http://localhost:5173
- Database: localhost:5433

## Project Structure

```
├── client/          # React frontend
├── server/          # NestJS backend
├── oldClient/       # Legacy frontend version
├── docker-compose.yml
└── docker.env
```
