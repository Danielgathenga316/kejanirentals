import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add_rental = () => {
  const navigate = useNavigate()

  const [rental_street, setRental_street] = useState("")
  const [rental_location, setRental_location] = useState("")
  const [rental_price, setRental_price] = useState("")
  const [rental_photo, setRental_photo] = useState("")

  // states to show background processes
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();

    setLoading("Please wait...")

    const formData = new FormData()
    formData.append("rental_street", rental_street)
    formData.append("rental_location", rental_location)
    formData.append("rental_price", rental_price)
    formData.append("rental_photo", rental_photo)

    try {
      const response = await axios.post("http://mamba1daniel.alwaysdata.net/api/add_rentals", formData)
      setLoading("")
      setError("")
      setSuccess(response.data.Message)

      setRental_street("")
      setRental_location("")
      setRental_price("")
      setRental_photo("")
    } catch (error) {
      setLoading("")
      setSuccess("")
      setError(error.message)
    }
  }

  return (
    <div className='row mt-4 justify-content-center rentals-page' >
      <div className="col-md-6 card shadow p-4">
        <h2>Upload Rentals</h2>
        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>

        <form action="" onSubmit={handlesubmit}>
          <input type="text" placeholder='Enter rental street' className='form-control' onChange={(e) => setRental_street(e.target.value)} required /><br />
          <textarea name="" id="" placeholder='Describe location' className='form-control' onChange={(e) => setRental_location(e.target.value)} required></textarea><br />
          <input type="text" placeholder='Enter rental price' className='form-control' onChange={(e) => setRental_price(e.target.value)} required /><br />
          <input type="file" placeholder='Choose file' className='form-control' onChange={(e) => setRental_photo(e.target.files[0])} accept='images/*' required /><br />
          <input type="submit" value="Upload Rental" className='btn btn-outline-info w-100' required />
        </form>
      </div>
    </div>
  )
}

export default Add_rental
