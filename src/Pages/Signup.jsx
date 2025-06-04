import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const InputField = ({ label, name, type = "text", placeholder, formik }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...formik.getFieldProps(name)}
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-600 text-sm mt-1">{formik.errors[name]}</p>
    )}
  </div>
);

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
      toast.success("Registration has been done successfully");
      setTimeout(() => navigate("/login"), 1000);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Sign Up
        </h2>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit} noValidate>
          <InputField
            label="Username"
            name="username"
            placeholder="Enter your username"
            formik={formik}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            formik={formik}
          />
          <InputField
            label="Mobile Number"
            name="mobile"
            placeholder="Enter your mobile number"
            formik={formik}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            formik={formik}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            formik={formik}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
