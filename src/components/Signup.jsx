import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Signup = () => {
    // declare the four states to hold data

  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [showPassword,setShowPassword]=useState(false)
  const [phone,setphone]=useState('')

  // create 3 states
  const [loading,setloading]=useState('')
  const [success,setsuccess]=useState('')
  const [Error,setError]=useState('')

  // create the function to handle submission
  const handlesubmit=async(e)=>{
   e.preventDefault()
   setloading('Please wait...')

  //  create a form data
  const formData=new FormData()
  formData.append('name',name)
  formData.append('email',email)
  formData.append('password',password)
  formData.append('phone',phone)

  // submit the details
  try {
  const response=await axios.post('https://mamba1daniel.alwaysdata.net/api/signup',formData)
  setsuccess(response.data.Message)
  setloading('')
  
    
  } catch (error) {
    setError(error.Message)
    setloading('')    
  }
  }
  
  
  return (
     <div  className='row justify-content-center  rentals-page'>
        <div className='col-md-6 p-3 card shadow  mt-4 mb-6 ' style={{maxHeight: "fit-content"}}>
        <h1>Sign up</h1>
        <br />
        {/* Create a form */}


        <form action="" onSubmit={handlesubmit}>
            
            <input type="text" placeholder='UserName' className='form-control' onChange={(e) => setname(e.target.value)}required/>
            <br /><br />
            <input type="email" placeholder='Email' className='form-control' onChange={(e) => setemail(e.target.value)}required/>
            <br /><br />
            <div className='input-group mb-3'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='form-control' value={password} onChange={(e) => setpassword(e.target.value)} required/>
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <br />
            <input type="phone" placeholder='Phone Number' className='form-control' onChange={(e) => setphone(e.target.value)}required/>
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
