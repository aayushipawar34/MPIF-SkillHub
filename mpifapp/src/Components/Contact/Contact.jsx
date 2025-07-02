import React, { useState } from 'react';
import './Contact.css';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name || !nameRegex.test(name)) {
      toast.warning('Please enter a valid name (only letters).');
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      toast.warning('Please enter a valid email address.');
      return false;
    }
    if (!message || message.length < 10) {
      toast.warning('Message must be at least 10 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/contact/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(result.message || 'Something went wrong!');
      }
    } catch {
      toast.error('Failed to send message. Server error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-banner">
        <img src="./images/contact.png" alt="Contact banner" />
      </div>

      <main className="contact-main">
        <section className="contact-form-info">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2>Send Us a Message</h2>

            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Write your message here (at least 10 characters)"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>
              We're here to assist you with any questions or support related to our educational programs.
              Feel free to get in touch!
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a><br />
              <strong>Email:</strong> <a href="mailto:info@mpifgurukul.com">info@mpifgurukul.com</a><br />
              <strong>Working Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM
            </p>

            <address>
              <h3>Our Location</h3>
              <p>MPIF GURUKUL, PVM5+X7R, Pologround, Malti Vanaspati, Indore, Madhya Pradesh 452015</p>
            </address>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </section>

        <section className="contact-map">
          <iframe
            title="MPIF SkillHub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29438.547082198595!2d75.8200280743164!3d22.734990800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd97eb78086b%3A0x99c7624a451ee282!2sInfobean%20foundation!5e0!3m2!1sen!2sin!4v1749463843919!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Contact;
