/** @format */

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, authLoading, authError } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await signup(username, password, email);

    navigate("/");

    // Clear the error if everything is fine
    setError("");
  };

  return (
    <div className="max-w-sm p-6 mx-auto border rounded-lg shadow-lg mt-36 bg-[#FCFCFC]">
      <h2 className="text-2xl font-bold text-[#151517]">Sign Up</h2>
      <p className="text-[#363a36] text-[15px] font-medium">
        Create an account to unlock exclusive features.
      </p>
      <form onSubmit={handleSignUp} className="py-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            disabled={authLoading}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-black border-2 rounded-lg shadow-lg focus:outline-blue-950"
            placeholder="Enter your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled={authLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-black border-2 rounded-lg shadow-lg focus:outline-blue-950"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            disabled={authLoading}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 text-black border-2 rounded-lg shadow-lg  focus:outline-blue-950 ${error && `focus:outline-red-600`} `}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            disabled={authLoading}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 text-black border-2 rounded-lg shadow-lg  focus:outline-blue-950 ${error && `focus:outline-red-600`} `}
            placeholder="Confirm your password"
            required
          />
        </div>
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={authLoading}
            className="w-40 py-2 text-center text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </div>
        {authError && <div className="text-red-500 place-self-center py-5">{authError.detail || authError}</div>}
      </form>
      <p className="mt-4 text-[17px] text-center text-[#15919B]">
        Already have an account?{" "}
        <a href="/login" className="text-[#151517] hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUp;
