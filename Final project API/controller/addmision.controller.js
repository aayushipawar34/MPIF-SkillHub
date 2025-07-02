// controllers/admissionController.js
import nodemailer from 'nodemailer';
import Admission from "../model/admission.model.js"; // spelling sahi karo

const submitAdmission = async (req, res) => {
  try {
    const {
      name,
      FatherName,
      DOB,
      Gender,
      Mobile,
      LocalAddress,
      PermanentAddress,
      State,
      Marital,
      Qualification,
      GraduationYear,
      income,
      City,
      course
    } = req.body;

    const userId = req.userId;
const userEmail = req.user.email;
const alreadyAdmitted = await Admission.findOne({ user: userId, course });

if (alreadyAdmitted) {
  return res.status(400).json({
    message: "You have already applied for this course."
  });
}
    const requiredFiles = [
      "photo",
      "aadhar",
      "marksheet_10",
      "marksheet_12",
      "last_year",
      "income_certificate"
    ];

    for (let file of requiredFiles) {
      if (!req.files[file]) {
        return res.status(400).json({ message: `Missing file: ${file}` });
      }
    }

    const admission = new Admission({
      name,
      email,
      FatherName,
      DOB,
      Gender,
      Mobile,
      LocalAddress,
      PermanentAddress,
      State,
      Marital,
      Qualification,
      GraduationYear,
      income,
      City,
      course,
      photo: req.files.photo[0].filename,
      aadhar: req.files.aadhar[0].filename,
      marksheet_10: req.files.marksheet_10[0].filename,
      marksheet_12: req.files.marksheet_12[0].filename,
      last_year: req.files.last_year[0].filename,
      income_certificate: req.files.income_certificate[0].filename,
       user: userId
    });

    await admission.save();

    res.status(200).json({ message: "Admission submitted successfully" });

  } catch (error) {
    console.error("Error in admission submission:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllAdmissions = async (req, res) => {
  try {
  
    const admissions = await Admission.find().populate("course");

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateAdmission = async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmission) return res.status(404).json({ message: "Admission not found" });
    res.status(200).json({ message: "Admission updated", data: updatedAdmission });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteAdmission = async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) return res.status(404).json({ message: "Admission not found" });
    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,  
      pass: process.env.GMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
const updateStatus = async (req, res) => {
  try {
    const { status, examName, examDate, reportingTime } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const admission = await Admission.findByIdAndUpdate(req.params.id, {
  status,
  examName,
  examDate,
  reportingTime
});


    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    let message = "";

    switch (status) {
      case "Submitted":
        message = `Dear ${admission.name},

Thank you for submitting your admission form. We have received your application successfully.

- MPIF Team`;
        break;

      case "Written Exam":
  if (!examName || !examDate || !reportingTime) {
    return res.status(400).json({ message: "Please provide exam name, date and reporting time." });
  }

  message = `Dear ${admission.name},

You are invited to appear for the *${examName}*.

InfoBeans Foundation  
Date: ${examDate}  
Reporting Time: ${reportingTime}  
Center: MPIF, Near MPEB, BSNL Exchange, Pologround, Indore (M.P)  
Map: https://maps.app.goo.gl/wpQdgYXZzysPzAM98

Please bring 2 photos and photocopies of all uploaded documents.

- MPIF Team`;
  break;


      case "Interview":
        message = `Dear ${admission.name},

Congratulations! You have cleared the written exam.

You are shortlisted for the *Interview round*.  
We will contact you soon with the date and time.

- MPIF Team`;
        break;

      case "House Visit":
        message = `Dear ${admission.name},

You have cleared the interview round.  
Our team will conduct a *House Visit* soon to verify your details.

- MPIF Team`;
        break;

      case "Accepted":
        message = `Dear ${admission.name},

🎉 Congratulations! You have been *Eligible* for the program.

Welcome to MPIF SkillHub Foundation. We’ll soon share more information regarding orientation and course details.

- MPIF Team`;
        break;

      case "Rejected":
        message = `Dear ${admission.name},

We regret to inform you that you have not been selected at this time.

Thank you for applying and we wish you all the best in your future.

- MPIF Team`;
        break;

      case "Pending":
      default:
        message = `Dear ${admission.name},

Your admission status has been updated to: ${status}.  
Please wait for further communication.

- MPIF Team`;
        break;
    }
    
    await sendEmail(
      admission.email,
      "Admission Status Update",
      message
    );

    res.json({ message: "Status updated", admission });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Error updating status" });
  }
};


export { submitAdmission, getAllAdmissions, getAdmissionById, updateAdmission, deleteAdmission, updateStatus };
export default submitAdmission;
