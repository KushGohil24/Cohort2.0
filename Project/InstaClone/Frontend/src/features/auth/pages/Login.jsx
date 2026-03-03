import React, { useState } from 'react'
import { Link } from 'react-router'
import "../style/form.scss";
import axios from "axios"
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login", {
      username, password
    }, { withCredentials: true })
      .then(res => {
        console.log(res.data);
      })
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
