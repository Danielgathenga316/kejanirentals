import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add_product = () => {
  const navigate=useNavigate()

  const[product_name,setProduct_name]=useState("")
  const[product_description,setProduct_description]=useState("")
  const[product_cost,setProduct_cost]=useState("")
  const[product_photo,setProduct_photo]=useState("")

  // states to show background processes
  const [loading,setLoading]=useState("")
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

  const handlesubmit=async(e)=>{
    e.preventDefault()

    setLoading("Please wait...")

    // create a form data
    const formData=new FormData()
    formData.append("product_name",product_name)
    formData.append("product_description",product_description)
    formData.append("product_cost",product_cost)
    formData.append("product_photo",product_photo)

    try {
      const response=await axios.post("http://kejanirentals.alwaysdata.net/api/add_product",formData)
      setLoading("")
      setError("")
      setSuccess(response.data.Message)

      // reset the  form
      setProduct_name("")
      setProduct_description("")
      setProduct_cost("")
      setProduct_photo("")
    } catch (error) {
      setLoading("")
      setSuccess("")
      setError(error.message)
    }
  }
  
  return (
    <div className='row  mt-4 justify-content-center'>
      <div className="col-md-6 card shadow p-4">
      <h2>Upload Rentals</h2>
      <h2 className='text-warning'>{loading}</h2>
      <h2 className='text-success'>{success}</h2>
      <h2 className='text-danger'>{error}</h2>
     

      <form action="" onSubmit={handlesubmit}>
        <input type="text" placeholder='Enter rental house' className='form-control'onChange={(e)=>setProduct_name(e.target.value)} required/><br />
        <textarea name="" id="" placeholder='Describe location' className='form-control'onChange={(e)=>setProduct_description(e.target.value)} required></textarea><br />
        <input type="text" placeholder='Enter rental price' className='form-control' onChange={(e)=>setProduct_cost(e.target.value)} required/><br /> 
        <input type="file" placeholder='Choose file' className='form-control' onChange={(e)=>setProduct_photo(e.target.files[0])} accept='images/*' required/><br />
        <input type="submit" value="Upload Rental" className='btn btn-outline-info w-100' required/> 
      </form>
      </div>  
    </div>
  )
  
}

export default Add_product
