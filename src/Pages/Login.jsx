import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // use `react-router-dom`
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchItemContext } from "../Contex/SearchContex";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    userNameError: "",
    passwordError: "",
  });
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(SearchItemContext);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "username" && error.userNameError) {
      setError((prev) => ({ ...prev, userNameError: "" }));
    }
    if (e.target.name === "password" && error.passwordError) {
      setError((prev) => ({ ...prev, passwordError: "" }));
    }
  };
  useEffect(() => {
    const getUserData = JSON.parse(localStorage.getItem("UserData"));
    setUserData(getUserData);
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.username) {
      errors.userNameError = "Username is required";
    }
    if (!formData.password) {
      errors.passwordError = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    if (
      userData.username !== formData.username &&
      userData.username !== formData.password
    ) {
      toast.error("Username and password data not matches");
      return;
    } else {
      toast.success("Login Successful");
      setFormData({ username: "", password: "" });
      setTimeout(() => {
        setIsUserLoggedIn(true);
        navigate("/");
      }, 1000)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to your account
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.userNameError && (
                <p className="text-red-600 text-sm mt-1">
                  {error.userNameError}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.passwordError && (
                <p className="text-red-600 text-sm mt-1">
                  {error.passwordError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow"
            >
              Login
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
