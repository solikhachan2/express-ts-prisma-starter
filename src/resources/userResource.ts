import { User, Role, Permission } from "@prisma/client";

// Define a type that extends the User type with related role and permissions
export interface UserResourceData extends User {
  role: Role & { permissions: Permission[] };
}

/**
 * Transform a user object into a simplified format for API responses
 * @param user The user object with role and permissions
 * @returns A simplified user object
 */
export const userResource = (user: UserResourceData) => {
  return {
    id: user.id,
    username: user.username,
    role: user.role.name,
    permissions: user.role.permissions.map((p) => p.name),
  };
};