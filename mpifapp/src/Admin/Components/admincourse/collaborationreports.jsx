import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header/header";
import Footer from "../../../Components/Footer/footer";

const ManageCollaboration = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [reply, setReply] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://mpif-skillhub.onrender.com/collebrative/all")
      .then((res) => {
        setCollaborations(res.data);
      })
      .catch((err) => console.error("Error fetching collaborations", err));
  }, []);

  const handleReply = async (id, email) => {
    try {
      const payload = {
        collaborationId: id,
        replyMessage: reply[email],
      };

      const response = await axios.post(
        "https://mpif-skillhub.onrender.com/collebrative/reply",
        payload
      );

      setMessage(response.data.message);
      setReply({ ...reply, [email]: "" });
    } catch (err) {
      console.error("Reply Error", err.response?.data || err.message);
      setMessage("Error sending reply");
    }
  };

  return (
    <>
    < Header />
    <div className="container mt-4">
      {message && <p className="text-success">{message}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Join Message</th>
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {collaborations.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.organization}</td>
              <td>{c.joinmessage}</td>
              <td>
                <textarea
                  value={reply[c.email] || ""}
                  onChange={(e) =>
                    setReply({ ...reply, [c.email]: e.target.value })
                  }
                  placeholder="Write reply..."
                  rows="2"
                  className="form-control mb-2"
                ></textarea>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReply(c._id, c.email)}
                >
                  Send Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    < Footer />
    </>
  );
};

export default ManageCollaboration;
