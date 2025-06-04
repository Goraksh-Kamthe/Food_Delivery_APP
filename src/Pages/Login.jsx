import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchItemContext } from "../Contex/SearchContex";

const Login = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(SearchItemContext);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("UserData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (
      !userData ||
      userData.username !== formData.username ||
      userData.password !== formData.password
    ) {
      toast.error("Username or password is incorrect");
      return;
    }

    toast.success("Login Successful");
    setFormData({ username: "", password: "" });

    setTimeout(() => {
      setIsUserLoggedIn(true);
      navigate("/");
    }, 1000);
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

          <form onSubmit={handleSubmit}>
            {["username", "password"].map((field) => (
              <div className="mb-4" key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  placeholder={`Enter your ${field}`}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[field] && (
                  <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

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
};

export default Login;
