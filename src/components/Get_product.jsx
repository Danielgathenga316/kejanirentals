import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Get_product = () => {
  const navigate=useNavigate()

  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")

  // function to handle the get product process
  const getProduct=async()=>{
    setLoading("Please wait we are retrieving products...")

    try {
      const response=await axios.get("http://kejanirentals.alwaysdata.net/api/get_product")
      setLoading("")
      setProducts(response.data)
      setError("")
      
    } catch (error) {
      setLoading("")
      setError(error.message)
      
    }
  }

  useEffect(()=>{
    getProduct()
  },[])

const imgurl="http://kejanirentals.alwaysdata.net/api/static/images/"
  return (
    
    
    <div className='row'>
      <h2>Rentals</h2> 

      <h2 className="text-warning">{loading}</h2>
      <h2 className="text-danger">{error}</h2>

       {products.map((product)=>(


      <div className="col-md-3 justify-content-center" height='350px' width='100%' >
        <div className="card mb-4 shadow" >
          <img src={imgurl+product.product_photo} alt="" height='250px'style={{objectFit:"contain"}}/>

          <div className="card-body bg-secondary">
            <h5>{product.product_name}</h5>
            <p className="text-muted">{product.product_description}</p>
            <b className="text-warning">Ksh {product.product_cost} /month</b><br />
            <button className='btn btn-info w-100' onClick={()=>navigate("/hirecart",{state:{product}})}>Rent Later</button><br /><br />
            
            <button className='btn btn-info w-100' onClick={()=>navigate("/mpesa",{state:{product}})}>Rent now</button>
          </div>
        </div>
      </div>
      
    ))}  
    
    </div>

    
  )
}

export default Get_product
