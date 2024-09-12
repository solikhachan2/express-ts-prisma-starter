import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  /**
   * Handle user registration
   */
  register: async (req: Request, res: Response) => {
    try {
      const { username, password, roleName } = req.body;
      const user = await authService.register(username, password, roleName);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error: (error as Error).message });
    }
  },

  /**
   * Handle user login
   */
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json({ message: "Login successful", ...result });
    } catch (error) {
      res.status(401).json({ message: "Error during login", error: (error as Error).message });
    }
  },
};