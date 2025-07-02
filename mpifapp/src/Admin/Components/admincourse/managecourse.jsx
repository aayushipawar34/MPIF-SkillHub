import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header/header";
import Footer from "../../../Components/Footer/footer";
import "./managecourse.css"; // Custom CSS

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    price: "",
    eligibility: "",
    modules: [""],
    perks: [""],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mpif-skillhub.onrender.com/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch {
      setError("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "modules" || type === "perks") {
      const updated = [...formData[type]];
      updated[index] = value;
      setFormData({ ...formData, [type]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ""] });
  };

  const removeField = (type, index) => {
    const updated = [...formData[type]];
    updated.splice(index, 1);
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.modules.some((m) => m.trim() === "") || formData.perks.some((p) => p.trim() === "")) {
      setError("Modules and Perks must not be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        if (!window.confirm("Are you sure you want to update this course?")) return;
        await axios.put(`https://mpif-skillhub.onrender.com/courses/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Course updated successfully!");
      } else {
        await axios.post("https://mpif-skillhub.onrender.com/courses", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Course added successfully!");
      }

      setFormData({
        title: "",
        duration: "",
        price: "",
        eligibility: "",
        modules: [""],
        perks: [""],
      });
      setIsEditing(false);
      setEditingId(null);
      fetchCourses();
    } catch {
      setError("Failed to save course");
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setIsEditing(true);
    setEditingId(course._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://mpif-skillhub.onrender.com/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully!");
      fetchCourses();
    } catch {
      setError("Failed to delete course");
    }
  };

  return (
    <>
      <Header />
   

<form onSubmit={handleSubmit} className="styled-full-form">
    <h2 className="form-heading">{isEditing ? "Edit Course" : "Add New Course"}</h2>
{error && <div className="error">{error}</div>}
  <div className="form-row">
    <div className="form-column">
      <label>TITLE <span className="required">*</span></label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Course Title"
        required
      />
    </div>
    <div className="form-column">
      <label>DURATION <span className="required">*</span></label>
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Course Duration"
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-column">
      <label>PRICE <span className="required">*</span></label>
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Course Price"
        required
      />
    </div>
    <div className="form-column">
      <label>ELIGIBILITY <span className="required">*</span></label>
      <input
        type="text"
        name="eligibility"
        value={formData.eligibility}
        onChange={handleChange}
        placeholder="Course Eligibility"
        required
      />
    </div>
  </div><div className="form-row">
  <div className="form-column">
    <label>MODULES <span className="required">*</span></label>
    {formData.modules.map((mod, idx) => (
      <div className="inline-group" key={idx}>
        <input
          type="text"
          value={mod}
          onChange={(e) => handleChange(e, idx, "modules")}
          required
        />
        <button type="button" className="minus-btn" onClick={() => removeField("modules", idx)}>−</button>
      </div>
    ))}
    <button type="button" className="add-btn" onClick={() => addField("modules")}>+ Add Module</button>
  </div>

  <div className="form-column">
    <label>PERKS <span className="required">*</span></label>
    {formData.perks.map((perk, idx) => (
      <div className="inline-group" key={idx}>
        <input
          type="text"
          value={perk}
          onChange={(e) => handleChange(e, idx, "perks")}
          required
        />
        <button type="button" className="minus-btn" onClick={() => removeField("perks", idx)}>−</button>
      </div>
    ))}
    <button type="button" className="add-btn" onClick={() => addField("perks")}>+ Add Perk</button>
  </div>
</div>


  <div className="button-wrapper">
    <button type="submit" className="submit-btn">
      {isEditing ? "Update Course" : "Add Course"}
    </button>
  </div>
</form>
        <h3 className="c-title">All Courses</h3>
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <h4>{course.title}</h4>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Eligibility:</strong> {course.eligibility}</p>
              <div>
                <p><strong>Modules:</strong></p>
                <ul>{course.modules.map((m, i) => <li key={i}>{m}</li>)}</ul>
              </div>
              <div>
                <p><strong>Perks:</strong></p>
                <ul>{course.perks.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div className="btn-group">
                <button onClick={() => handleEdit(course)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      <Footer />
    </>
  );
};

export default ManageCourses;
