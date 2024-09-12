import { PrismaClient } from "@prisma/client";
import { roleResource, RoleResourceData } from "../resources/roleResource";

const prisma = new PrismaClient();

export const rolePermissionService = {
  /**
   * Create a new role
   * @param name Name of the role
   * @returns A simplified role object
   */
  createRole: async (name: string) => {
    const role = await prisma.role.create({ data: { name } });
    return roleResource(role as RoleResourceData);
  },

  /**
   * Assign a permission to a role
   * @param roleId ID of the role
   * @param permissionId ID of the permission
   * @returns The updated role object
   */
  assignPermissionToRole: async (roleId: number, permissionId: number) => {
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: { permissions: { connect: { id: permissionId } } },
      include: { permissions: true },
    });
    return roleResource(updatedRole);
  },

  /**
   * Get all roles with their permissions
   * @returns An array of simplified role objects
   */
  getRoles: async () => {
    const roles = await prisma.role.findMany({ include: { permissions: true } });
    return roles.map((role) => roleResource(role));
  },

  /**
   * Get all permissions
   * @returns An array of permission objects
   */
  getPermissions: async () => {
    return prisma.permission.findMany();
  },
};