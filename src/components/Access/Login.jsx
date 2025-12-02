import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';

const Login = () => {
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
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>     
      <form
        onSubmit={handleLogin}
        className="p-8 rounded shadow-md w-full max-w-md border border-2 border-sky-300"
        style={{
          backgroundColor: "var(--bg-elevated)",
          color: "var(--text)",
          transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
        }}
      >
        <h2 className="font-bold pb-2 text-center">Log in</h2>
        <p className="text-center" style={{ color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--text)" }} className="underline">
            Sign up
          </Link>
        </p>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="p-3 mt-2 rounded border border-[var(--border)] 
                      focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
            }}
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="p-3 mt-2 rounded border border-[var(--border)] 
                      focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
  
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="relative group overflow-hidden rounded-full px-4 py-2 text-center cursor-pointer"
            style={{
              backgroundColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <span className="absolute inset-0 rounded-full bg-sky-300 text-black scale-0 group-hover:scale-150 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-black duration-500">Log in</span>
          </button>
        </div>

        {error && (
          <p className="text-center pt-4" style={{ color: "var(--muted)" }}>
            {error}
          </p>
        )}

      </form>
    </div>
  );
};

export default Login;