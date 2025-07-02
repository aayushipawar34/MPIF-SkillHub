import Batch from "../model/batch.model.js";

export const addBatch = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { title, course, startDate, endDate, isOpen } = req.body;

    const batch = new Batch({ title, course, startDate, endDate, isOpen });
    await batch.save();

    res.status(200).json({ message: "Batch created successfully", batch });
  } catch (err) {
    res.status(500).json({ message: "Error creating batch", error: err.message });
  }
};

export const getOpenBatches = async (req, res) => {
  try {
    const today = new Date();

    const batches = await Batch.find({
      isOpen: true,
      endDate: { $gte: today },
    }).populate("course");

    res.status(200).json(batches);
  } catch (err) {
    res.status(500).json({ message: "Error fetching batches", error: err.message });
  }
};

export const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch updated successfully", batch });
  } catch (err) {
    res.status(500).json({ message: "Error updating batch", error: err.message });
  }
};

export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting batch", error: err.message });
  }
};
