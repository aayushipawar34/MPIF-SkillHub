import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import "./admin.css"; // make sure your CSS has nice cards, buttons, table

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://mpif-skillhub.onrender.com/user/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.users || res.data;
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://mpif-skillhub.onrender.com/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== userId));
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleVerify = async (userId, currentStatus) => {
    try {
      await axios.put(
        `https://mpif-skillhub.onrender.com/user/${userId}`,
        { verified: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch {
      setError("Failed to update verification");
    }
  };


  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.filter((u) => u.role !== "admin");
  const totalUsers = normalUsers.length;
  const verified = normalUsers.filter((u) => u.verified).length;
  const unverified = totalUsers - verified;

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1 className="dashboard-title"> Admin Dashboard</h1>

        {error && <div className="error-box">{error}</div>}

        {/* Stats Cards */}
        <div className="card-grid">
          <div className="card-box">
            <h4>Total Users</h4>
            <p>{totalUsers}</p>
          </div>
          <div className="card-box">
            <h4>Verified Users</h4>
            <p>{verified}</p>
          </div>
          <div className="card-box">
            <h4>Unverified Users</h4>
            <p>{unverified}</p>
          </div>
          <div className="card-box">
            <h4>Admins</h4>
            <p>{admins}</p>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading users...</p>
        ) : (
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {normalUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.verified ? "Yes" : "No"}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn warning"
                        onClick={() => handleVerify(u._id, u.verified)}
                      >
                        {u.verified ? "Unverify" : "Verify"}
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
