import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MyAccountPage = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    mobile: "",
    currentPassword: "",
  });
  const [originalPassword, setOriginalPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState(null); // for profile picture preview and display

  const newPasswordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const fileInputRef = useRef(null); // ref for file input

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData) {
      setProfileData({
        username: userData.username || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        currentPassword: "",
      });
      setOriginalPassword(userData.password);
      setName(userData.username);
      setProfilePic(localStorage.getItem("UserProfilePic") || null);
    }
  }, []);

  // Handle clicking Edit Profile Picture button to open file dialog
  const handleEditProfilePicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file input change to preview and store image
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (optional)
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      // Convert image file to base64 string for preview & storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("UserProfilePic", reader.result);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const { username, email, mobile, currentPassword } = profileData;
    const newPass = newPasswordRef.current.value.trim();
    const confirmPass = confirmPasswordRef.current.value.trim();

    // Basic Profile Validation
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!mobile) newErrors.mobile = "Contact number is required";

    // Password update only if one of the fields is filled
    const isPasswordChangeAttempted = currentPassword || newPass || confirmPass;

    if (isPasswordChangeAttempted) {
      if (!currentPassword || !newPass || !confirmPass) {
        newErrors.currentPassword = "All password fields are required";
      } else if (currentPassword !== originalPassword) {
        newErrors.currentPassword = "Current password is incorrect";
      } else if (newPass !== confirmPass) {
        newErrors.currentPassword = "New and confirm passwords do not match";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save updated user data
    const updatedUserData = {
      username,
      email,
      mobile,
      password: isPasswordChangeAttempted ? newPass : originalPassword,
    };

    localStorage.setItem("UserData", JSON.stringify(updatedUserData));
    toast.success("Your profile has been updated successfully!");
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600">My Account</h1>
          <p className="text-gray-600 mt-2">
            Manage your Foodie Express profile and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <img
            src={
              profilePic ||
              "data:image/jpeg;base64,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"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-orange-300 shadow-md object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-orange-700">{name}</h2>
            <p className="text-gray-500">Food Lover | Premium Member</p>
            <button
              onClick={handleEditProfilePicClick}
              className="mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Edit Profile Picture
            </button>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        {/* Unified Form */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="mobile"
                value={profileData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.mobile && (
                <span className="text-red-500">{errors.mobile}</span>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t pt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={profileData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                ref={newPasswordRef}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                ref={confirmPasswordRef}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
          {errors.currentPassword && (
            <span className="text-red-500 block">{errors.currentPassword}</span>
          )}

          {/* Single Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccountPage;
