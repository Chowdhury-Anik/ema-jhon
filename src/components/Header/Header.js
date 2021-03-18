import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {

    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/catagories">Catagories</Link>
                <Link to="/Best-Selling">Best Selling</Link>
                <Link to="/manage">Manage Inventory</Link>
                <Link to="review">Order Review</Link>
                <Link to="shipment">Shipment</Link>
                <Link to="login">Login</Link>
            </nav>
        </div>
    );
};

export default Header;