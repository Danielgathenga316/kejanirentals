import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fb from "../assets/fb.png" 
import x from "../assets/x.png"
import IG from "../assets/IG.png"
import slide1 from "../assets/slide1.avif"


const About = () => {
  

  return (
    <div className='d-flex flex-column  rentals-page'>
       <img src={slide1} alt="slide2" className="w-100 d-block" height="650px" width="650px"/>
      <div className='row flex-grow-1'>
        <div className="col-md-6 p-4 mx-auto">
         
        <h1 className='overlay bold text-white'>About Kejanirentals</h1>
        <p className='overlay-p mt-5'>Kejanirentals is the trusted rental company that connects people to properties. Serving the Kenyan market, we use AI to match you with a real estate agency, private seller or landlord with the right property.</p>

        <p>Welcome to our rental platform</p>
        <p className='text-start'>The idea for our company came from real-life experiences with the difficulties of finding rental houses. From unclear listings to time-consuming searches, the process often felt frustrating and inefficient.

We set out to create a solution—a platform where people can easily find trusted listings and connect directly with landlords. What began as a small idea has grown into a mission to improve the rental experience for everyone.</p>
        <hr /><br />

        <p className='text-start'>Finding the perfect place to live shouldn’t be difficult—that’s where we come in. Our platform is designed to help you discover rental houses that match your needs, budget, and lifestyle.

Whether you’re a tenant searching for your next home or a landlord looking to list your property, we make the process smooth, fast, and hassle-free.</p>
        <hr /><br />

        <p className='text-start'>We are a dedicated platform focused on simplifying the process of finding and listing rental houses. Our goal is to connect tenants with quality homes while helping landlords reach the right audience quickly and efficiently.

We believe that finding a home should be simple, transparent, and stress-free. That’s why we provide reliable listings, clear information, and an easy-to-use experience for everyone.</p>
        <hr /><br />

        </div>
      </div>

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

export default About
