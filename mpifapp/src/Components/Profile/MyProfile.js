import React, { useEffect, useState } from 'react';
import { getProfile, deleteProfile } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleEdit = () => navigate('/edit-profile');

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
    if (!confirmDelete) return;

    try {
      await deleteProfile();
      alert('Profile deleted successfully.');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/sign-up');
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete profile. Try again later.');
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!user) return <div className="error">Failed to load user profile.</div>;

  return (
    <>
      <Header />
      
      <main className="profile-main-content">
        <section className="profile-section profile-section-overview">
          <div className="profile-overview-img">
            {user?.profilePicture ? (
              <img
                src={`https://mpif-skillhub.onrender.com/uploads/${user.profilePicture}`}
                alt="Profile"
              />
            ) : (
              <div className="default-profile-circle">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="profile-overview-name">
              <h1>Welcome {user.username}</h1>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-header">
            <span>Personal Information</span>
            <div>
              <button className="profile-edit-btn" onClick={handleEdit}>Edit</button>
              <button className="profile-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <div className="profile-section-grid">
            <div>
              <span>First Name</span>
              <div>{user.firstName ? user.firstName : user.username?.split(" ")[0] || "N/A"}</div>
            </div>
            <div>
              <span>Date of Birth</span>
              <div>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
            </div>
            <div>
              <span>Email Address</span>
              <div>{user.email}</div>
            </div>
            <div>
              <span>Phone Number</span>
              <div>{user.contact}</div>
            </div>
            <div>
              <span>Gender</span>
              <div>{user.gender || "N/A" }</div>
            </div>
            <div>
              <span>Education</span>
              <div>{user.education || "N/A"}</div>
            </div>
          </div>
        </section>

        {user.admissionStatus && user.admissionStatus !== "Pending" && (
          <section className="profile-section">
            <div className="profile-section-header">
              <span>Admission Status</span>
            </div>
            <div className="profile-section-grid">
              <span>{user.admissionStatus}</span>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ViewProfile;
