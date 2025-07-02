import express from "express";
import {
  addBatch,
  getOpenBatches,
  updateBatch,
  deleteBatch
} from "../controller/batch.controller.js";

const router = express.Router();

router.post("/add", addBatch);
router.get("/open", getOpenBatches);
router.patch("/update/:id", updateBatch);
router.delete("/delete/:id", deleteBatch);

export default router;
