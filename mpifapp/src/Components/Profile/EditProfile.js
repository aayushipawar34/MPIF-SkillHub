import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/footer";
import Header from "../Header/header";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    gender: '',
    dateOfBirth: '',
    education: '',
    address: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData.data); 
        setFormData({
          username: profileData.data.username || '',
          contact: profileData.data.contact || '',
          gender: profileData.data.gender || '',
          dateOfBirth: profileData.data.dateOfBirth ? profileData.data.dateOfBirth.slice(0, 10) : '',
          education: profileData.data.education || '',
          address: profileData.data.address || '',
        });

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreviewUrl(null);
    }
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('contact', formData.contact);
      data.append('gender', formData.gender);
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('education', formData.education);
      data.append('address', formData.address);
      if (selectedImage) data.append('profilePicture', selectedImage);

      await updateProfile(data);
      setSaving(false);
      alert('Profile updated successfully!');
      navigate('/my-profile');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      setSaving(false);
    }
  };

  if (loading) return <div className="container mt-5">Loading profile...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <>
      <Header />
      <div className="container mt-5">
          <div className="mb-3">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
        <div className="card shadow-lg p-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 className="mb-4 text-center">Edit Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 d-flex justify-content-center">
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="rounded-circle shadow"
                  style={{ width: "130px", height: "130px", objectFit: "cover" }}
                />
              ) : user?.profilePicture ? (
                <img
                  src={`https://mpif-skillhub.onrender.com/uploads/${user.profilePicture}`}
                  alt="Profile"
                  className="rounded-circle shadow"
                  style={{ width: "130px", height: "130px", objectFit: "cover" }}
                />
              ) : formData.username && formData.username.trim() !== '' ? (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "130px",
                    height: "130px",
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {formData.username.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "130px",
                    height: "130px",
                    backgroundColor: "#f0f0f0",
                    color: "#999",
                    fontSize: "20px",
                  }}
                >
                  No Name
                </div>
              )}
            </div>


            <input
              type="file"
              className="form-control mb-4"
              accept="image/*"
              onChange={e => setSelectedImage(e.target.files[0])}
            />

            {/* Form Fields */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Education</label>
                <input
                  type="text"
                  name="education"
                  className="form-control"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>


<div className="d-flex justify-content-center mt-4">
  <button type="submit" className="btn btn-primary" disabled={saving}>
    {saving ? 'Saving...' : 'Submit'}
  </button>
</div>


          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
