import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  
  
  return (
     <div  className='row justify-content-center mt-3'>
        <div className='col-md-6 card shadow p-4 mt-3 ' >
        <h1>Sign UP</h1>
        <br />
        {/* Create a form */}


        <form action="">
            
            <input type="text" placeholder='First Name' className='form-control' required/>
            <br /><br />
            <input type="text" placeholder='Last Name' className='form-control'required/>
            <br /><br />
            <input type="email" placeholder='Email' className='form-control'required/>
            <br /><br />
            <input type="password" placeholder='Password' className='form-control'required/>
            <br /><br />
            <input type="phone" placeholder='Phone Number' className='form-control'required/>
            <br /><br />
            <input type="submit" className='w-100 btn btn-outline-danger' value='Sign Up'/>

            <br /><br />
            

            Already have an account? <Link to='/signin'>Signin</Link>

        </form>
    </div>
    </div>
  )
}

export default Signup
