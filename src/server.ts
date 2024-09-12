import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();