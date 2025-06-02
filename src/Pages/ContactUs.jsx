import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have a question, feedback, or concern? Our team is here to help you!
          </p>
        </div>

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

        
        <div>
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">✍️ Write to Us</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
             onClick={(e)=>{e.preventDefault();toast.success('Thanks for sharing.Our customer executive connect will soon..');setTimeout(()=>{navigate('/')},500)}}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
