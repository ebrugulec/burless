import { useState, useEffect } from 'react'
import Router from 'next/router'

import { register } from '../requests/userApi'

const SignUp = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onRegisterSubmit = (e) => {
    e.preventDefault()
    if (username && email && password) {
      register({ username, email, password })
        .then((res) => {
          Router.push('/');
        })
        .catch((err) => {
          console.log('err', err)
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center"> login </h2>
      <form onSubmit={onRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default SignUp
