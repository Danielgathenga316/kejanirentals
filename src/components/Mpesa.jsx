import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Mpesa = () => {
  // unpackage the data
  const {rental}=useLocation().state||{}
  const [message,setMessage]=useState("")
  const [error,setError]=useState("")
  const [phone,setPhone]=useState("")

  const handlesubmit=async(e)=>{
    e.preventDefault()
    setMessage("Please wait as we process your request...")

    const formData=new FormData()
    formData.append("phone",phone)
    formData.append("amount",rental.rental_price)

    const response=await axios.post("http://kejanirentals.alwaysdata.net/api/mpesa_payment",formData)

    setMessage(response.data.message)
  }

  const imgurl="http://kejanirentals.alwaysdata.net/api/static/images/"



  return (
    <div className='row justify-content-center'>
      <h2 className='text-success mt-3'>Lipa na Mpesa</h2>
      <h2 className="text-warning">{message}</h2>


      <div className="col-md-6 p-3">
        <div className="card shadow p-3 ">
          <img src={imgurl+rental.rental_photo} alt="" />
          <h5 className='text-info'>{rental.rental_name}</h5><br />
          <p className="text-muted">{rental.rental_location}</p>
          <b className="text-warning text-start">Ksh {rental_price}</b><br />

          <form action="" onSubmit={handlesubmit}>
          <input type="tel" placeholder='Enter Phone (254 xxxxxxxxx)' className='form-control  p-3' onChange={(e)=>setPhone(e.target.value)}/><br />
          <input type="submit" value="Make Payment" className='btn btn-outline-danger w-100'/>
          </form>

        </div>
      </div>
      
    </div>
  )
}

export default Mpesa
