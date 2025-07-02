import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  FatherName: String,
  dob: String,
  Gender: String,
  Mobile: String,
  LocalAddress: String,
  PermanentAddress: String,
  State: String,
  Marital: String,
  Qualification: String,
  GrauationYear: String,
  income: String,
  city: String,
   status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', 
  },
  files: {
    photo: String,
    aadhar: String,
    marksheet_10: String,
    marksheet_12: String,
    last_year: String,
    income_certificate: String
  },
  examName: String,
examDate: String,
reportingTime: String,

 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user", 
  required: true
}
});

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;
