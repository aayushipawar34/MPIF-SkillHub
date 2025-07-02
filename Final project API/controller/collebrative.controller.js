import Collaborative from '../model/collebrative.model.js'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const createCollaborative = async (req, res) => {
  try {
    const { email, name, organization, joinmessage } = req.body;

    if (!email || !name || !organization || !joinmessage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntry = new Collaborative({
      email,
      name,
      organization,
      joinmessage,
    });

    await newEntry.save();
    res.status(201).json({ message: "Collaboration request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllCollaborations = async (req, res) => {
  try {
    const collabs = await Collaborative.find().sort({ createdAt: -1 });
    res.status(200).json(collabs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendReplyToCollaborator = async (req, res) => {
  try {
    const { collaborationId, replyMessage } = req.body;

    if (!collaborationId || !replyMessage) {
      return res.status(400).json({ message: "Collaboration ID and reply message required" });
    }

    const collab = await Collaborative.findById(collaborationId);
    if (!collab) {
      return res.status(404).json({ message: "Collaboration record not found" });
    }

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: collab.email,
      subject: "Reply from MPIF SkillHub Admin",
      text: `Hello ${collab.name},\n\n${replyMessage}\n\nRegards,\nMPIF SkillHub Team`,
    };

    await transporter.sendMail(mailOptions);
    collab.adminReply = replyMessage;
    await collab.save();

    res.status(200).json({ message: "Reply sent to collaborator successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply", error: error.message });
  }
};
