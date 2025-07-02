import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header/header";
import Footer from "../../../Components/Footer/footer";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);
  const [reply, setReply] = useState({});
  const [message, setMessage] = useState("");

useEffect(() => {
  axios.get("https://mpif-skillhub.onrender.com/contact/all")
    .then((res) => {
      setContacts(res.data);
    })
    .catch((err) => console.log("Error fetching contacts", err));
}, []);


 const handleReply = async (contactId, email) => {
  try {
    const payload = {
      contactId: contactId,
      replyMessage: reply[email],
    };
    const response = await axios.post("https://mpif-skillhub.onrender.com/contact/reply", payload);
    setMessage(response.data.message);
    setReply({ ...reply, [email]: "" });
  } catch (err) {
    console.error(" Error sending reply", err.response?.data || err.message);
    setMessage("Error sending reply");
  }
};

  return (
    <>
   <Header />
    <div className="container mt-4">
      {message && <p>{message}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Message</th><th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>
                <textarea
                  value={reply[c.email] || ""}
                  onChange={(e) => setReply({ ...reply, [c.email]: e.target.value })}
                  placeholder="Write reply..."
                  rows="2"
                  className="form-control mb-2"
                ></textarea>
                <button className="btn btn-sm btn-primary" onClick={() => handleReply(c._id,c.email)}>
                  Send Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
     </>
  );
};

export default ManageContact;
