import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Navbar, NavLink } from 'react-bootstrap';
import Get_product from './components/Get_product';
import Add_product from './components/Add_product';
import Mpesa from './components/Mpesa';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header text-danger">
        KejaniHomes-Rent & Live online
      </header>
      

      <nav className='bg-dark' >
        <Link to="/signin" className='text-white'>SignIn</Link>,
        <Link to="/signup" className='text-white'>Signup</Link>,
        <Link to="/getproduct" className='text-white'>Get_Product</Link>,
        <Link to="/addproduct" className='text-white'>Add_Product</Link>,
,        <Link to="/mpesa" className='text-white'>Mpesa</Link>
      </nav>
      
      <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='' element={<Get_product/>}/>
        <Route path='/addproduct' element={<Add_product/>}/>
        <Route path='/mpesa' element={<Mpesa/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
