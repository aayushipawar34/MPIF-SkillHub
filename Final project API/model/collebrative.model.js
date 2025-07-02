import mongoose from 'mongoose';

const collaborativeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true }, 
  organization: { type: String },
  joinmessage: String,
}, { timestamps: true });

export default mongoose.model("Collaborative", collaborativeSchema);
  