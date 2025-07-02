import Contact from '../model/contact.model.js';
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

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntry = new Contact({ name, email, message });
    await newEntry.save();

    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts); 
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendReplyToUser = async (req, res) => {
  try {
    const { contactId, replyMessage } = req.body;

    if (!contactId || !replyMessage) {
      return res.status(400).json({ message: "Contact ID and reply message required" });
    }

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: contact.email,
      subject: "Reply from MPIF SkillHub Admin",
      text: `Hello ${contact.name},\n\n${replyMessage}\n\nRegards,\nMPIF SkillHub Team`,
    };

    await transporter.sendMail(mailOptions);

    contact.adminReply = replyMessage;
    await contact.save();

    res.status(200).json({ message: "Reply sent to user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply", error: error.message });
  }
};
