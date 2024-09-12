import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePasswords } from "../utils/passwordUtils";
import jwt from "jsonwebtoken";
import { userResource, UserResourceData } from "../resources/userResource";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authService = {
  /**
   * Register a new user
   * @param username User's username
   * @param password User's password
   * @param roleName Name of the role to assign to the user
   * @returns A simplified user object
   */
  register: async (username: string, password: string, roleName: string) => {
    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    // Find the role by name
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      throw new Error("Invalid role");
    }

    // Create the user with the assigned role
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: { connect: { id: role.id } },
      },
      include: { role: { include: { permissions: true } } },
    });

    // Return the user data using the userResource transform
    return userResource(user as UserResourceData);
  },

  /**
   * Authenticate a user and generate a JWT
   * @param username User's username
   * @param password User's password
   * @returns An object containing the JWT and user data
   */
  login: async (username: string, password: string) => {
    // Find the user by username, including their role and permissions
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: { include: { permissions: true } } },
    });

    // Check if the user exists and the password is correct
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT containing user information
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
        permissions: user.role.permissions.map((p) => p.name),
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return the token and user data
    return {
      token,
      user: userResource(user as UserResourceData),
    };
  },
};