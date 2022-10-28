import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
import Banner from './components/banner/Banner';
import ProductCardList from './components/products/ProductCardList';

function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <Banner/>
      <Login/>
      <ProductCardList/>
    </div>
  );
}

export default App;
