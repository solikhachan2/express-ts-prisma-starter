import { Router } from "express";
import { rolePermissionController } from "../controllers/rolePermissionController";
import { authenticateToken, requirePermission } from "../middleware/authMiddleware";
import { PERMISSIONS } from "../config/permissions";

const router = Router();

router.post("/", authenticateToken, requirePermission(PERMISSIONS.CREATE_ROLE), rolePermissionController.createRole);
router.post("/assign-permission", authenticateToken, requirePermission(PERMISSIONS.ASSIGN_PERMISSION), rolePermissionController.assignPermissionToRole);
router.get("/", authenticateToken, requirePermission(PERMISSIONS.VIEW_ROLE), rolePermissionController.getRoles);
router.get("/permissions", authenticateToken, requirePermission(PERMISSIONS.VIEW_ROLE), rolePermissionController.getPermissions);

export default router;