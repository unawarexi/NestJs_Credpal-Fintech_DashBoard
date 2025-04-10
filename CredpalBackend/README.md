<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This project is built using the [NestJS](https://nestjs.com) framework. It uses PostgreSQL as the database, Prisma as the ORM, and Docker for containerization.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **Docker**: A platform for developing, shipping, and running applications in containers.

---

## Project Setup

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?schema=public
PORT=5432
```

Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials.
**example of mine**
DATABASE_URL="postgresql://postgres:2222@localhost:5432/interview?schema=public"

```
username =  postgres((default for postgres))
password = my postgress password
host =  localhost:4000
port = 5432 (default for postgres)
database = name of the database youre using (credpal)
```
---

### Installation

```bash
$ npm install
```

### Running the Application

#### Using Docker

1. Build and start the Docker containers:
   ```bash
   $ docker-compose up --build
   ```

   **for local build**
   ```bash
   $ docker compose up postgres -d
   ```

2. The application will be available at `http://localhost:4000`.

#### Without Docker Locally

1. Start the PostgreSQL database.
2. Run the application:
   ```bash
   $ npm run start:dev
   ```

### Prisma Setup

1. Generate Prisma client:
   ```bash
   $ npx prisma generate
   ```

2. Apply database migrations:
   ```bash
   $ npx prisma migrate dev
   ```
3. View database migrations:
   ```bash
   $ npx prisma studio
   ```
--- 

## Run Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

Refer to the [NestJS deployment documentation](https://docs.nestjs.com/deployment) for detailed instructions.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
