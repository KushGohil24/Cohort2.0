import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    console.log("Register Data:", form);

    // 👉 Next step: call authService.register(form)
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      
      <div className="w-full max-w-md p-10 rounded-3xl 
        bg-[var(--surface-container)] 
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-2">
          Create Account
        </h1>

        <p className="text-sm mb-8 text-[var(--text-secondary)]">
          Begin your intelligence journey
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm px-4 py-2 rounded-xl 
            bg-red-500/10 text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full font-medium
              bg-gradient-to-br
              from-[var(--primary)]
              to-[var(--primary-dark)]
              text-[#004a35] hover:opacity-90 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm mt-6 text-center text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--primary)] hover:opacity-80 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;