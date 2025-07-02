import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import "./adminbatch.css";

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({
    title: "",
    course: "",
    startDate: "",
    endDate: "",
    isOpen: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    const res = await axios.get("http://localhost:5000/batch/open");
    setBatches(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/batch/update/${editingId}`
      : "http://localhost:5000/batch/add";

    await axios({
      method: editingId ? "PATCH" : "POST",
      url,
      data: form,
    });

    setForm({ title: "", course: "", startDate: "", endDate: "", isOpen: true });
    setEditingId(null);
    loadBatches();
  };

  const handleEdit = (batch) => {
    setForm(batch);
    setEditingId(batch._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/batch/delete/${id}`);
    loadBatches();
  };

  return (
    <>
      <Header />
      
        <h2>Manage Batches</h2>

        <form onSubmit={handleSubmit} className="batch-form">
          <input
            type="text"
            placeholder="Batch Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course ID"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.isOpen}
              onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
            />
            Open
          </label>
          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>

        <table className="batch-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Open</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch._id}>
                <td>{batch.title}</td>
                <td>{batch.course?.title || batch.course}</td>
                <td>{batch.startDate.slice(0, 10)}</td>
                <td>{batch.endDate.slice(0, 10)}</td>
                <td>{batch.isOpen ? "Yes" : "No"}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(batch)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(batch._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
      <Footer />
    </>
  );
};

export default ManageBatches;
