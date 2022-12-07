import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './components/users/Login';
import Register from './components/users/Register';
import UserProfile from './components/users/UserProfile'
import NavBar from './components/navBar/NavBar';
import Banner from './components/banner/Banner';
import ProductCardList from './components/products/ProductCardList';
import Cart from './components/cart/Cart';
import Order from './components/order/Order';
import Footer from './components/footer/Footer';
import Purchased from './components/purchase/Purchase';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='fixed_container'>
        <Header/>
        <NavBar/>
      </div>
      <main className='main_container'>
        <Routes>
          <Route exact path='/' element={<Banner/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/profile' element={<UserProfile/>} />
          <Route exact path='/products' element={<ProductCardList/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/order' element={<Order/>} />
          <Route exact path='/successfulpurchase' element={<Purchased/>} />
        </Routes>
      </main>
      <Footer/>
    </Router>
    
  );
}

export default App;
