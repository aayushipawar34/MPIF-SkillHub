import express from "express";
import {
  createContact,
  getAllContacts,
  sendReplyToUser
} from "../controller/contact.controller.js";

const router = express.Router();

router.post("/add", createContact);
router.get("/all", getAllContacts);
router.post("/reply", sendReplyToUser); 

export default router;
