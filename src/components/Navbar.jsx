import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='row'>
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg bg-white shadow">
            <div className="container-fluid">
                <Link className='navbar-brand text-danger'>Rentals</Link>
                 <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarnav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                <div className="collapse navbar-collapse" id='navbarnav'>

                   
                    <div className="navbar-nav me-auto">
                        <div className="nav-item">
                            <Link to='/addproduct' className='nav-link'>Add_product</Link>
                        </div>
                        <div className="nav-item">
                            <Link to='/getproduct' className='nav-link'>Get_product</Link>
                        </div>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <div className="nav-item">
                            <Link to='/signin' className='nav-link bg-danger rounded-pill'>Log In</Link>
                        </div>

                        
                    </div>

                </div>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
