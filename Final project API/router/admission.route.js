import express from 'express';
import upload from '../middlewares/upload.js';
import { verifyUser } from '../middlewares/verifyUser.js';
import Admission from '../model/admission.model.js'; // 👈 Import model
import { updateStatus } from '../controller/addmision.controller.js';


const router = express.Router();

router.post(
  '/',
  verifyUser,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 },
    { name: 'marksheet_10', maxCount: 1 },
    { name: 'marksheet_12', maxCount: 1 },
    { name: 'last_year', maxCount: 1 },
    { name: 'income_certificate', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        name, email, FatherName, dob, Gender,
        Mobile, LocalAddress, PermanentAddress,
        State, Marital, Qualification, GrauationYear,
        income, city,course
      } = req.body;
const userId = req.user.id;
     
const alreadyExists = await Admission.findOne({ user: userId, course });
      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message: "You have already applied for this course."
        });
      }

       const files = req.files;
      const newAdmission = new Admission({
        name,
        email,
        FatherName,
        dob,
        Gender,
        Mobile,
        LocalAddress,
        PermanentAddress,
        State,
        Marital,
        Qualification,
        GrauationYear,
        income,
        city,
        course,
         user: userId,
        files: {
          photo: files?.photo?.[0]?.filename || "",
          aadhar: files?.aadhar?.[0]?.filename || "",
          marksheet_10: files?.marksheet_10?.[0]?.filename || "",
          marksheet_12: files?.marksheet_12?.[0]?.filename || "",
          last_year: files?.last_year?.[0]?.filename || "",
          income_certificate: files?.income_certificate?.[0]?.filename || ""
        }
      });

      await newAdmission.save();

      res.status(201).json({ success: true, message: "Admission submitted & saved!" });
    } catch (error) {
      console.error("Error while saving admission:", error);
      res.status(500).json({ success: false, message: "Failed to save admission", error });
    }
  }
);

router.get('/all', verifyUser, async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    console.error("Error fetching admissions:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});


router.get('/:id', verifyUser, async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    res.status(200).json(admission);
  } catch (error) {
    console.error("Error fetching admission:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// 3. Admission delete
router.delete('/:id', verifyUser, async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Admission not found" });
    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    console.error("Error deleting admission:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.put(
  '/:id',
  verifyUser,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 },
    { name: 'marksheet_10', maxCount: 1 },
    { name: 'marksheet_12', maxCount: 1 },
    { name: 'last_year', maxCount: 1 },
    { name: 'income_certificate', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const admissionId = req.params.id;
      const updateData = { ...req.body }; 

      if (req.files) {
        updateData.files = {};
        if (req.files.photo) updateData.files.photo = req.files.photo[0].filename;
        if (req.files.aadhar) updateData.files.aadhar = req.files.aadhar[0].filename;
        if (req.files.marksheet_10) updateData.files.marksheet_10 = req.files.marksheet_10[0].filename;
        if (req.files.marksheet_12) updateData.files.marksheet_12 = req.files.marksheet_12[0].filename;
        if (req.files.last_year) updateData.files.last_year = req.files.last_year[0].filename;
        if (req.files.income_certificate) updateData.files.income_certificate = req.files.income_certificate[0].filename;
      }

    
      const updatedAdmission = await Admission.findByIdAndUpdate(admissionId, updateData, {
        new: true,
        runValidators: true
      });

      if (!updatedAdmission) {
        return res.status(404).json({ message: "Admission not found" });
      }

      res.status(200).json({ success: true, message: "Admission updated successfully", data: updatedAdmission });
    } catch (error) {
      console.error("Error updating admission:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
);
router.put('/update-status/:id', updateStatus);

router.get("/admission/check/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const existing = await Admission.findOne({ user: userId });
    if (existing) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
