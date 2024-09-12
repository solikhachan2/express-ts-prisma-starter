# Express TypeScript Prisma Starter Kit

This starter kit provides a solid foundation for building scalable and maintainable Node.js applications using Express, TypeScript, and Prisma ORM. It includes user authentication, role-based access control, and a structure inspired by Laravel's resources and services.

## Features

- Express.js with TypeScript
- Prisma ORM for database operations
- JWT-based authentication
- Role-based access control
- Resource-based response formatting
- Service-layer for business logic
- Environment-based configuration
- Basic project structure with clear separation of concerns

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- PostgreSQL (v12.0 or later)

## Getting Started

To get this project up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/express-ts-prisma-starter.git
   cd express-ts-prisma-starter
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```
   Replace the placeholder values with your actual database credentials and desired JWT secret.

4. Set up the database:
   ```
   npx prisma migrate dev
   ```
   This command will create the database tables based on your Prisma schema.

5. Generate Prisma client:
   ```
   npx prisma generate
   ```

6. Start the development server:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:3000`.

## Project Structure

```
.
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── resources
│   ├── prisma
│   ├── utils
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

- `config`: Contains configuration files, such as permission constants.
- `controllers`: Handles incoming requests and returns responses.
- `middleware`: Contains reusable middleware functions.
- `routes`: Defines API routes and links them to controllers.
- `services`: Contains the core business logic.
- `resources`: Handles data transformation for API responses.
- `prisma`: Contains the Prisma schema and migrations.
- `utils`: Houses utility functions used across the application.

## Available Scripts

- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Starts the production server.
- `npm run prisma:generate`: Generates Prisma client.
- `npm run prisma:migrate`: Runs Prisma migrations.
- `npm run prisma:studio`: Starts Prisma Studio for database management.

## Adding New Features

When adding new features to this starter kit:

1. Create new resources in the `resources` folder for data transformation.
2. Add business logic to service files in the `services` folder.
3. Create new controllers in the `controllers` folder, using the services and resources.
4. Define new routes in the `routes` folder and link them to the controllers.
5. Update the Prisma schema in `prisma/schema.prisma` if new database models are needed.

## Best Practices

- Keep controllers thin by delegating business logic to services.
- Use resources consistently to ensure uniform API responses.
- Write meaningful comments to explain complex logic or important concepts.
- Follow the established patterns and naming conventions when adding new code.
- Use TypeScript's type system to ensure type safety throughout the application.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
