import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(20, "Must be 20 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("UserData", JSON.stringify(values));
      if (localStorage.getItem("UserData")) {
        toast.success("Registration has been done successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-br from-blue-100 to-blue-300 ">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Sign Up
        </h2>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("mobile")}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.mobile}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Already have account */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
