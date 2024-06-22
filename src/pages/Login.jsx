import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Head from '../components/Head';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../Hero.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        const errorData = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: `Login failed: ${errorData.message}`
        }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: `Login failed: ${error.message}`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/account');
    }
  }, [redirect, navigate]);

  return (
    <>
      <Head />
      <div className="font-poppins flex items-center justify-center min-h-screen bg-gray-100 mt-[20px]">
        <div className="bg-white p-8 rounded-lg space-y-4 shadow-lg w-full h-[450px] max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4 relative mt-12">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-10 cursor-pointer text-gray-600 mt-2"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white font-semibold text-sm py-4 px-12 focus:outline-none focus:shadow-outline hover:bg-gray-700"
              >
                {isLoading && <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
