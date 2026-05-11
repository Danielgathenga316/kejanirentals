import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Mpesa = () => {
  // unpackage the data sent from Get_rental
  const { rental } = useLocation().state || {}
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [phone, setPhone] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process your request...")

    const formData = new FormData()
    formData.append("phone", phone)
    formData.append("amount", rental?.rental_price || "")

    const response = await axios.post("http://mamba1daniel.alwaysdata.net/api/mpesa_payment", formData)

    setMessage(response.data.message)
  }

  const imgurl = "http://mamba1daniel.alwaysdata.net/api/static/images/"

  if (!rental) {
    return (
      <div className="text-center mt-4">
        <h3 className="text-danger">No rental selected. Please go back and choose a rental.</h3>
      </div>
    )
  }

  return (
    <div className='row justify-content-center bg-rgba(172, 157, 157, 0.233)'>
      <h2 className='text-success mt-3'>Lipa na Mpesa</h2>
      <h2 className="text-warning">{message}</h2>


      <div className="col-md-6 p-3">
        <div className="card shadow p-3 ">
          <img
            src={rental.rental_photo_url || `${imgurl}${encodeURIComponent(rental.rental_photo || "")}`}
            alt={rental.rental_street || "Rental image"}
            className="card-img-top"
          />
          <h5 className='text-info'>{rental.rental_street}</h5><br />
          <p className="text-muted">{rental.rental_location}</p>
          <b className="text-warning text-start">Ksh {rental.rental_price} /month</b><br />

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
