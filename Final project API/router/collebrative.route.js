import express from "express";
import {
  createCollaborative,
  getAllCollaborations,
  sendReplyToCollaborator
} from "../controller/collebrative.controller.js";

const router = express.Router();

router.post("/add", createCollaborative); 
router.get("/all", getAllCollaborations); 
router.post("/reply", sendReplyToCollaborator);  

export default router;
