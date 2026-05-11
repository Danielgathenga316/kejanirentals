import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Get_rental from './components/Get_rental';
import Add_rental from './components/Add_rental';
import Mpesa from './components/Mpesa';
import Rentalcart from './components/Rentalcart';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from './components/About';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        

        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/getrental' element={<Get_rental />} />
          <Route path='/addrental' element={<Add_rental />} />
          <Route path='/hirecart' element={<Rentalcart />} />
          <Route path='/mpesa' element={<Mpesa />} />
          <Route path='/about'element={<About/>}/>
          
          
        </Routes>
      </div>
    </BrowserRouter>


  );
}

export default App;
