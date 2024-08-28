import express from "express";
const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory
} from "../controllers/categoryController.js";

router.route("/").post(authenticate, authorizedAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizedAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizedAdmin, removeCategory);

export default router;
