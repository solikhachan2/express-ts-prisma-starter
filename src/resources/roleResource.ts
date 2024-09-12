import { Role, Permission } from "@prisma/client";

// Define a type that extends the Role type with related permissions
export interface RoleResourceData extends Role {
  permissions: Permission[];
}

/**
 * Transform a role object into a simplified format for API responses
 * @param role The role object with permissions
 * @returns A simplified role object
 */
export const roleResource = (role: RoleResourceData) => {
  return {
    id: role.id,
    name: role.name,
    permissions: role.permissions.map((p) => p.name),
  };
};