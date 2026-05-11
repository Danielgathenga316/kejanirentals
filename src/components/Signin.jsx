import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      const res = await fetch('https://mamba1daniel.alwaysdata.net/api/signin', {
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
      navigate('/getrental')
    } catch (err) {
      setError(err.message || 'Sign in failed')
    }
  }

  return (
    <div className='row justify-content-center rentals-page'>
      <div className='col-md-6 p-3 card shadow  mt-4 mb-6 ' style={{maxHeight: "fit-content"}}>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='form-control' required/>
          <br />
          <div className='input-group mb-3'>
            <input
              type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}placeholder='Password' className='form-control' required/>
            <button type='button' className='btn btn-outline-secondary' onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type='submit' className='w-100 btn btn-outline-danger'>
            Sign In
          </button>
          <br /><br />
          {error && <div className='text-danger'>{error}</div>}

         Don't have an account? <Link to='/signup' className=''>Signup</Link>
      </form>
   
      
    </div>
    </div>
  )
}

export default Signin
