import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(name, email, password);
      // Wait for auth to redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px]"></div>
      
      <main className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="bg-surface-container-low/70 backdrop-blur-xl p-8 rounded-xl shadow-2xl shadow-surface-container-lowest border border-outline-variant/10">
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
            </div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface mb-1">Create Account</h1>
            <p className="text-on-surface-variant font-medium tracking-tight text-sm">Initialize Your Sanctuary</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 rounded-lg bg-error-container/20 text-error text-sm font-semibold">{error}</div>}
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="name">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">person</span>
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary/40 focus:bg-surface-container-low rounded-lg py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/50 transition-all outline-none" 
                  id="name" 
                  type="text" 
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">alternate_email</span>
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary/40 focus:bg-surface-container-low rounded-lg py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/50 transition-all outline-none" 
                  id="email" 
                  type="email" 
                  placeholder="name@sanctuary.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant" htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">lock</span>
                </div>
                <input 
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary/40 focus:bg-surface-container-low rounded-lg py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline/50 transition-all outline-none" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] duration-150" type="submit">
              Register Node
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-on-surface-variant text-sm">
              Already have an account? 
              <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/30 transition-all ml-1">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
