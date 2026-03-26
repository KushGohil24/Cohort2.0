import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">

            <div className="w-full max-w-md p-10 rounded-3xl 
        bg-[var(--surface-container)] 
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

                <h1 className="text-3xl font-semibold mb-2">
                    Welcome Back
                </h1>

                <p className="text-sm mb-8 text-[var(--text-secondary)]">
                    Access your knowledge space
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-5 py-3 rounded-2xl outline-none
              bg-[var(--surface-highest)]
              focus:ring-2 focus:ring-[var(--primary)]/20"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full font-medium
              bg-gradient-to-br
              from-[var(--primary)]
              to-[var(--primary-dark)]
              text-[#004a35] hover:opacity-90 transition cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm mt-6 text-center text-[var(--text-secondary)]">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[var(--primary)] hover:opacity-80 transition"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;