import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    contact: '',
  });
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Login') {
        await login(formData.email, formData.password);
        toast.success('Welcome back to Vyra!');
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          fullname: formData.fullname,
          contact: formData.contact,
        });
        toast.success('Welcome to Vyra!');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='min-h-[70vh] flex items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-[420px] m-auto gap-4'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h1 className='vyra-heading text-3xl mb-2'>{currentState === 'Login' ? 'Welcome Back' : 'Create Account'}</h1>
          <div className='flex items-center justify-center gap-3'>
            <div className='w-8 h-[1px] bg-[#c9a96e]'></div>
            <p className='text-xs tracking-[3px] uppercase text-[#c9a96e]'>
              {currentState === 'Login' ? 'Sign in to your account' : 'Join the Vyra family'}
            </p>
            <div className='w-8 h-[1px] bg-[#c9a96e]'></div>
          </div>
        </div>

        {/* Form Fields */}
        {currentState !== 'Login' && (
          <input
            type='text'
            name='fullname'
            value={formData.fullname}
            onChange={handleChange}
            className='vyra-input'
            placeholder='Full Name'
            required
          />
        )}
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='vyra-input'
          placeholder='Email Address'
          required
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='vyra-input'
          placeholder='Password'
          required
        />
        {currentState !== 'Login' && (
          <input
            type='tel'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            className='vyra-input'
            placeholder='Phone Number (10 digits)'
            required
          />
        )}

        {/* Actions */}
        <div className='w-full flex justify-between text-sm mt-1'>
          {currentState === 'Login' && (
            <p className='cursor-pointer text-[#777] hover:text-[#c9a96e] transition-colors text-xs tracking-wider'>
              Forgot password?
            </p>
          )}
          <p
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
            className='cursor-pointer text-[#c9a96e] hover:text-[#a8893e] transition-colors text-xs tracking-wider ml-auto'
          >
            {currentState === 'Login' ? 'Create an account →' : '← Back to login'}
          </p>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className='vyra-btn w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <span>{isLoading ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Create Account'}</span>
        </button>

        {/* Divider */}
        <div className='flex items-center gap-4 w-full mt-4'>
          <div className='flex-1 h-[1px] bg-[#e0d6c8]'></div>
          <span className='text-xs text-[#999] tracking-wider'>OR</span>
          <div className='flex-1 h-[1px] bg-[#e0d6c8]'></div>
        </div>

        {/* Google Auth */}
        <button
          type='button'
          onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}
          className='w-full mt-4 flex items-center justify-center gap-3 py-3 border border-[#e0d6c8] bg-white hover:bg-[#faf7f2] transition-colors text-xs tracking-wider text-[#333] font-medium'
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className='w-4 h-4' />
          Continue with Google
        </button>
      </form>
    </div>
  )
}

export default Login
