import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import NavBar from './components/navBar/NavBar';
import Banner from './components/banner/Banner';
import ProductCardList from './components/products/ProductCardList';
import CartItemCardList from './components/cart/CartItemCardList';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <NavBar/>
      <main>
        <Routes>
          <Route path='/' element={<Banner/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/products' element={<ProductCardList/>} />
          <Route path='/cart' element={<CartItemCardList/>} />
        </Routes>
      </main>
      <Footer/>
    </Router>
    
  );
}

export default App;
