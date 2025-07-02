import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  eligibility: { type: String, required: true },
  modules: [{ type: String, required: true }],
  perks: [{ type: String, required: true }],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
