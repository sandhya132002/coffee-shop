import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the styles

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Use formData directly
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Message sent successfully!"); // Success toast
      } else {
        toast.error(`Error: ${data.error}`); // Error toast
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error submitting the form."); // Error toast
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://5.imimg.com/data5/SELLER/Default/2021/8/AP/WL/GJ/5504430/roasted-coffee-beans.jpg')",
      }}
    >
      <div className="w-full max-w-lg backdrop-blur-lg border rounded-3xl text-white p-6 sm:p-10 hover:scale-[1.03] transition-transform">
        <h2 className="text-3xl font-bold text-center uppercase mb-2">Contact Us</h2>
        <p className="text-center text-white/80 text-base">Have a question or feedback? We'd love to hear from you!</p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          </div>

          <div className="relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
          </div>

          <div className="relative">
            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-4 pt-3 rounded-3xl bg-white/10 border border-white/30 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 sm:w-2/3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-transform duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold">Get in Touch</h3>
          <p className="text-white/80 mt-2">
            <i className="fas fa-map-marker-alt text-yellow-400 mr-2" />
            123 Coffee Street, City, Country
          </p>
          <p className="text-white/80 mt-1">
            <i className="fas fa-phone-alt text-yellow-400 mr-2" />
            +1 (123) 456-7890
          </p>
          <p className="text-white/80 mt-1">
            <i className="fas fa-envelope text-yellow-400 mr-2" />
            contact@coffeeshop.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
