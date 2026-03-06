import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from "axios"
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, loading, handleLogin} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password)
    navigate("/")
  }
  if(loading){
    return (<main>
      <h1>Loading...</h1>
    </main>)
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" onInput={(e) => { setUsername(e.target.value) }} name="username" placeholder="Enter username" />
          <input type="password" onInput={(e) => { setPassword(e.target.value) }} name="password" placeholder="Enter password" />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
