import { Request, Response } from "express";
import { rolePermissionService } from "../services/rolePermissionService";

export const rolePermissionController = {
  /**
   * Handle role creation
   */
  createRole: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const role = await rolePermissionService.createRole(name);
      res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
      res.status(400).json({ message: "Error creating role", error: (error as Error).message });
    }
  },

  /**
   * Handle assigning a permission to a role
   */
  assignPermissionToRole: async (req: Request, res: Response) => {
    try {
      const { roleId, permissionId } = req.body;
      const updatedRole = await rolePermissionService.assignPermissionToRole(roleId, permissionId);
      res.json({ message: "Permission assigned to role successfully", role: updatedRole });
    } catch (error) {
      res.status(400).json({ message: "Error assigning permission to role", error: (error as Error).message });
    }
  },

  /**
   * Handle retrieving all roles
   */
  getRoles: async (req: Request, res: Response) => {
    try {
      const roles = await rolePermissionService.getRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching roles", error: (error as Error).message });
    }
  },

  /**
   * Handle retrieving all permissions
   */
  getPermissions: async (req: Request, res: Response) => {
    try {
      const permissions = await rolePermissionService.getPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching permissions", error: (error as Error).message });
    }
  },
};