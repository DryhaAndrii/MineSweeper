# MineSweeper Docker Setup

Этот проект настроен для запуска в Docker контейнерах.

## Структура

- `server/` - NestJS бэкенд
- `client/` - React фронтенд (не в Docker)
- `docker-compose.yml` - конфигурация Docker Compose
- `docker.env` - переменные окружения для Docker

## Запуск

### 1. Запуск бэкенда и базы данных в Docker

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

### 2. Запуск фронтенда (локально)

```bash
cd client
npm install
npm run dev
```

## Порты

- Бэкенд: http://localhost:3002
- PostgreSQL: localhost:5433 (внешний порт)
- Фронтенд: http://localhost:5173

## Переменные окружения

Основные переменные находятся в файле `docker.env`:

- `NODE_ENV=production`
- `PORT=3002`
- `CLIENT=http://localhost:5173`
- `DB_URL=postgres://postgres:password@postgres:5432/mineSweeper`

## База данных

PostgreSQL автоматически создается при первом запуске с:

- База данных: `mineSweeper`
- Пользователь: `postgres`
- Пароль: `password`

## Полезные команды

```bash
# Пересборка контейнеров
docker-compose up --build

# Просмотр статуса контейнеров
docker-compose ps

# Подключение к базе данных
docker-compose exec postgres psql -U postgres -d mineSweeper

# Просмотр логов конкретного сервиса
docker-compose logs backend
docker-compose logs postgres
```
