import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      toast.success("Thanks for reaching out! We'll get back to you soon.");
      setTimeout(() => {
        navigate("/");
      }, 700);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have a question, feedback, or concern? Our team is here to help you!
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
          <div className="bg-orange-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl mb-2">📞</div>
            <h3 className="text-lg font-semibold text-orange-700">Phone</h3>
            <p className="text-gray-700 mt-1">+91 123-4567</p>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl mb-2">📧</div>
            <h3 className="text-lg font-semibold text-orange-700">Email</h3>
            <p className="text-gray-700 mt-1">contact@foodieexpress.com</p>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl mb-2">📍</div>
            <h3 className="text-lg font-semibold text-orange-700">Location</h3>
            <p className="text-gray-700 mt-1">123 Flavor Street, Foodville</p>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">✍️ Write to Us</h2>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formik.touched.subject && formik.errors.subject && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.subject}</div>
              )}
            </div>

            <div>
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message *"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
