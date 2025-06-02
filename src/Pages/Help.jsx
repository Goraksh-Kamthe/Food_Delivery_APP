import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Help = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8">
        <ToastContainer />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Help Center</h1>
          <p className="text-gray-600">Need assistance? We're here to help with anything related to Foodie Express.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-orange-100 border-l-4 border-orange-400 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-700 mb-1">📧 Email Support</h3>
            <p className="text-gray-700 text-sm">Reach us anytime at:</p>
            <p className="text-gray-900 font-medium mt-1">support@foodieexpress.com</p>
          </div>

          <div className="bg-orange-100 border-l-4 border-orange-400 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-700 mb-1">📞 Call Us</h3>
            <p className="text-gray-700 text-sm">Our support team is available from 9 AM to 9 PM:</p>
            <p className="text-gray-900 font-medium mt-1">+91 123-4567</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">❓ Frequently Asked Questions</h2>
          <ul className="space-y-4 text-sm text-gray-800">
            <li>
              <span className="font-semibold text-gray-900">🍔 How can I track my order?</span><br />
              Go to the "My Orders" section to see real-time status updates.
            </li>
            <li>
              <span className="font-semibold text-gray-900">⏰ What if my delivery is late?</span><br />
              If your order is delayed, please contact support for immediate assistance.
            </li>
            <li>
              <span className="font-semibold text-gray-900">🔄 Can I cancel my order?</span><br />
              Orders can be canceled within the first 5 minutes. After that, it depends on restaurant confirmation.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">✍️ Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            onClick={(e)=>{e.preventDefault();toast.success('Thanks for sharing.Our customer executive connect will soon..');setTimeout(()=>{navigate('/')},500)}}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
