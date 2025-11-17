import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';

const Signin = () => {
  console.log("Rendering Signin component");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser({email, password}); // Use your signIn function

    if (error) {
      setError(error); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      navigate("/home");
    }

    if (session) {
      setError(""); // Reset the error when there's a session
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="font-bold pb-2 text-center">Log in</h2>
        <p className="text-center">
          Don't have an account? <Link to="/signup" className="text-blue-400 underline" >Sign up</Link>
        </p>
        
        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 border border-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Password">Password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2 border border-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center">
          <button className="relative group overflow-hidden rounded-full px-4 py-2 bg-black text-center cursor-pointer">
            {/* Animation */}
            <span className="absolute inset-0 rounded-full bg-green-600 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
            <span className="relative z-10 text-white">Log in</span>
          </button>
        </div>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;