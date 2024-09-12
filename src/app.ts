import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import rolePermissionRouter from "./routes/rolePermissionRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/roles", rolePermissionRouter);

export default app;