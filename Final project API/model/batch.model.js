import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isOpen: { type: Boolean, default: true }
}, { timestamps: true });

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
