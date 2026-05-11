import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    window.location.href = '/signin'
  }

  return (
    <div className='row'>
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg bg-dark shadow">
            <div className="container-fluid">
                <Link to="/getrental" className='navbar-brand text-danger p-3'><img src={logo} alt="Logo" height="40" /> Kejanirentals</Link>
                 <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarnav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                <div className="collapse navbar-collapse" id='navbarnav'>

                   
                    <div className="navbar-nav me-auto">
                        
                        <div className="nav-item">
                            <Link to='/getrental' className='nav-link text-secondary'>Home</Link>
                        </div>
                        <div className="nav-item">
                            <Link to='/addrental' className='nav-link text-secondary'>Addrentals</Link>
                        </div><div className="nav-item">
                            <Link to='/about' className='nav-link text-secondary'>AboutUs</Link>
                        </div>
                    </div>
                    <div className="navbar-nav ms-auto">
                      {!token ? (
                        <>
                          <div className="nav-item">
                            <Link to="/signup" className='nav-link text-danger'>Signup</Link>
                          </div>
                          <div className="nav-item">
                            <Link to='/signin' className='nav-link bg-danger rounded-pill'>Login</Link>
                          </div>
                        </>
                      ) : (
                        <div className="nav-item">
                          <button onClick={handleLogout} className='btn btn-outline-danger'>Logout</button>
                        </div>
                      )}
                    </div>

                </div>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
