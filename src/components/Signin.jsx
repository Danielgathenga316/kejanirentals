import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      // Replace URL with your sign-in API endpoint
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const message = (await res.json())?.message || 'Invalid credentials'
        throw new Error(message)
      }

      const data = await res.json()
      localStorage.setItem('token', data.token || '')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Sign in failed')
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 p-3 card shadow mt-4 mb-5'>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='form-control'
            required
          />
          <br />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='form-control'
            required
          />
          <br />
          <button type='submit' className='w-100 btn btn-outline-danger'>
            Sign In
          </button>
          <br /><br />
          {error && <div className='text-danger'>{error}</div>}

         Don't have an account? <Link to='/signup'>Signup</Link>
      </form>
   
      
    </div>
    </div>
  )
}

export default Signin
