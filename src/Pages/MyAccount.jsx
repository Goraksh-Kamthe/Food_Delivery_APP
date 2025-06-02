import React from 'react';

const MyAccountPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your Foodie Express profile and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <img
            src="https://i.pravatar.cc/100?img=13"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-orange-300 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-orange-700">John Doe</h2>
            <p className="text-gray-500">Food Lover | Premium Member</p>
            <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
              Edit Profile Picture
            </button>
          </div>
        </div>

        {/* Account Details Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                defaultValue="+1 9876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                defaultValue="123 Flavor St, Foodville"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Password Update Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">🔐 Update Password</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
