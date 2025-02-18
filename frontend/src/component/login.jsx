import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(userToken) {
      navigate('/')
    }
  },[userToken])

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log("Google Login Success:", credentialResponse);

      // Decode the token to get user info
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log("Decoded Token:", decodedToken);

      // Send the token to the backend
      const response = await axios.post('http://localhost:8000/api/v1/auth/google-login', {
        token: credentialResponse.credential,
      });
      console.log("=======>>>>>>>>>", response)
      setUserToken(response.data.userToken)
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      // Send form data to the backend for registration
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      )
      setUserToken(response.data.token)
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Welcome Back!
          </h1>
          <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
        </div>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 text-xl text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xl text-left font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="relative flex items-center justify-center mt-4">
          <div className="absolute inset-0 top-2.5 border-t border-gray-200"></div>
          <span className="relative bg-white text-sm text-gray-500">or</span>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="filled_blue"
            // shape="pill"
            text="continue_with"
            size="large"
            logo_alignment="left"
            width="300"
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-purple-600 hover:text-purple-800">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;