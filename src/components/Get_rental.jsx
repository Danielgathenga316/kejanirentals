import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fb from "../assets/fb.png"
import x from "../assets/x.png"
import IG from "../assets/IG.png"
import slide1 from "../assets/slide1.avif"
import slide2 from "../assets/slide2.avif"
import FilterPanel from "./FilterPanel"

const Get_rental = () => {
  const navigate = useNavigate()
  
  // 3 states 

  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("rentalCart")
    return saved ? JSON.parse(saved) : []
  })

  const [filters, setFilters] = useState({
    search: "",
    type: "All",
    beds: "All",
    maxPrice: "All",
    sort: "newest",
  })  

  const imgurl ="https://mamba1daniel.alwaysdata.net/api/static/images/"
  
  const getRentals = async () => {
    setLoading(true)

    try {
      const response = await axios.get(
        "https://mamba1daniel.alwaysdata.net/api/get_rentals"
      )

      // Backend returns array directly
      setRentals(response.data)
      setError("")
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setError(
        "Failed to load rentals. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRentals()
  }, [])

  useEffect(() => {
    localStorage.setItem("rentalCart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (rental) => {
    setCart((prev) => {
      if (prev.some((item) => item.rental_id === rental.rental_id)) {
        return prev
      }
      return [...prev, rental]
    })
  }

  const handleRentLater = (rental) => {
    addToCart(rental)
    navigate("/hirecart")
  }

  const isInCart = (rental) =>
    cart.some((item) => item.rental_id === rental.rental_id)

  const typeOptions = [
    "All",
    "Apartments",
    "street",    
  ]

  const priceOptions = [
    { value: "All", label: "Any Price" },
    { value: "10000", label: "Up to 10,000" },
    { value: "20000", label: "Up to 20,000" },
    { value: "30000", label: "Up to 30,000" },
    { value: "50000", label: "Up to 50,000" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
  ]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
 
  const filteredRentals = rentals
    .filter((rental) => {

      const keyword = filters.search.toLowerCase().trim()
      const searchMatch =
        rental.rental_street?.toLowerCase().includes(keyword) ||
        rental.rental_location?.toLowerCase().includes(keyword) ||
        rental.rental_name?.toLowerCase().includes(keyword)

      const priceMatch = filters.maxPrice === "All" ||
        Number(rental.rental_price) <=
          Number(filters.maxPrice)
      return searchMatch && priceMatch
    })

    // Sorting
    .sort((a, b) => {
      if (filters.sort === "priceLow") {
        return (
          Number(a.rental_price) -
          Number(b.rental_price)
        )
      }

      if (filters.sort === "priceHigh") {
        return (
          Number(b.rental_price) -
          Number(a.rental_price)
        )
      }      
      return (
        Number(b.rental_id || 0) -
        Number(a.rental_id || 0)
      )
    })

  return (

    <div className="d-flex flex-column min-vh-100  rentals-page">
      <div className="row flex-grow-1">
        <div className="col-12">

          <section className="row">
            <div className="col-md-12">
              <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
                <div className="carousel-inner"> 

                  <div className="carousel-item active">
                    <img src={slide1} alt="slide1" className="w-100 d-block" height="650px" style={{ objectFit: "cover" }}/>
                  </div>

                  <div className="carousel-item">
                    <img src={slide2} alt="slide2" className="w-100 d-block" height="650px" style={{ objectFit: "cover" }}/>
                  </div>
                  
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-center text-white"
                    style={{zIndex: 10,textShadow:"2px 2px 10px rgba(0,0,0,0.7)",}}>
                    <h1 className="fw-bold display-4">Welcome to Kejani Rentals</h1>
                    <p className="lead">Find your perfect home</p>
                  </div>
                </div>               

                <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                </button>
              </div>
            </div>
          </section>
          
          {/* filter panel */}

          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            typeOptions={typeOptions}
            priceOptions={priceOptions}
            sortOptions={sortOptions}
          />

          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/hirecart")}
            >
              View Cart ({cart.length})
            </button>
          </div>
        </div>
       
        {loading && (
          <h3 className="text-warning text-center mt-4">Please wait we are retrieving rentals...</h3>
        )}        
        {error && (
          <h3 className="text-danger text-center mt-4">{error}</h3>
        )}    
        {!loading &&
          filteredRentals.length === 0 && (
            <h4 className="text-center text-muted mt-4">No rentals found.</h4>
          )}
        
        {filteredRentals.map((rental) => (
          <div
            className="col-lg-4 col-md-3 col-sm-6 mb-4 p-4 "
            key={
              rental.rental_id ||
              rental.rental_name
            }>

            <div className="card shadow h-100 border-0">           

              <img src={rental.rental_photo_url || `${imgurl}${encodeURIComponent(rental.rental_photo || "")}`
                }
                alt={rental.rental_street} className="card-img-top" height="250px" loading="lazy" style={{objectFit: "cover",}}/>

              {/* Card Body */}
              <div className="card-body bg-light d-flex  flex-column shadow-sm">                
                <h5 className="fw-bold">{rental.rental_street || rental.rental_street}</h5>              
                <p className="text-dark mb-2">{rental.rental_location}</p>
                <h6 className="text-warning fw-bold mb-3">Ksh {rental.rental_price} /month  </h6>
                
                <div className="mt-auto">               
                  <button
                    className={`btn ${isInCart(rental) ? "btn-secondary" : "btn-info"} w-100 mb-2`}
                    onClick={() => handleRentLater(rental)}
                  >
                    {isInCart(rental) ? "View Cart" : "Rent Later"}
                  </button>

                  <button className="btn btn-primary w-100" onClick={() => navigate("/mpesa", {
                    state: { rental },
                  })}>
                    Rent Now
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     {/* footer */}
      <footer className="bg-secondary text-light mt-4 p-4">
        <div className="row">  
          <div className="col-md-4 mb-3">
            <h5>Kejani Rentals</h5>
            <ul className="list-unstyled small text-danger">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Guides</li>
            </ul>
          </div>        

          <div className="col-md-4 mb-3">
            <h5>Kejani Rentals</h5>
            <p className="text-white-50">A unique rental experience with curated homes, modern search, and flexible stays for every budget.</p>
            <p className="mb-0"><strong>Need help?</strong></p>
            <p>Email:kejanirentals@gmail.com<br />Phone: +254 740237162</p>
          </div>        

          <div className="col-md-4 mb-3">
            <h5>Stay Connected</h5>
            <div className="d-center gap-30 mt-2">
              <a href="https://facebook.com" className="text-decoration-none">
                <img src={fb} alt="Facebook" style={{width: '30px', height: '30px'}} />
              </a>
              <a href="https://instagram.com" className="text-decoration-none">
                <img src={IG} alt="Instagram" style={{width: '30px', height: '30px'}} />
              </a>
              <a href="https://x.com" className="text-decoration-none">
                <img src={x} alt="X (Twitter)" style={{width: '30px', height: '30px'}} />
              </a>
            </div>
          </div>
        </div>     

        <div className="border-top border-light border-opacity-25 mt-4 pt-3 text-center small">&copy; 2026 Kejani Rentals.Find your perfect home.
        </div>
      </footer>
    </div>
  )
}

export default Get_rental