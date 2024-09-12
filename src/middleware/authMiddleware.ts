import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Define the structure of our JWT payload
interface JwtPayload {
  userId: number;
  role: string;
  permissions: string[];
}

// Extend the Express Request type to include our user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to authenticate the JWT token
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded as JwtPayload;
    next();
  });
};

/**
 * Middleware to check if the user has the required permission
 * @param permission The permission to check for
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};