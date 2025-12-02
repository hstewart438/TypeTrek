import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UseAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser({ email, firstName, lastName, password });

      if (result.success) {
        navigate("/home");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <form
        onSubmit={handleSignUp}
        className="p-8 rounded shadow-md w-full max-w-md"
        style={{
          backgroundColor: "var(--bg-elevated)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
        }}
      >
        <h2 className="font-bold pb-2 text-center">Sign up today!</h2>
        <p className="text-center" style={{ color: "var(--muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--text)" }} className="underline">
            Log in
          </Link>
        </p>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 rounded"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 mt-2 rounded"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 mt-2 rounded"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2 rounded"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="relative group overflow-hidden rounded-full px-4 py-2 text-center cursor-pointer"
            style={{
              backgroundColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <span className="absolute inset-0 rounded-full bg-amber-400 text-black scale-0 group-hover:scale-150 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-black duration-500">Sign up</span>
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

export default Signup;
