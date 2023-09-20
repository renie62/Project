import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateLatestProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProduct);
router.put("/status/:id", verifyToken, updateLatestProduct);

export default router;
