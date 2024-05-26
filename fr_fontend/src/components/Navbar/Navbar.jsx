import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");

    const chefLoginStatus=localStorage.getItem('chefLoginStatus')
    const userLoginStatus=localStorage.getItem('userLoginStatus')
    return (
        <div className='navbar'>
            <img src={assets.logo} alt="" className="logo" />
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <li className="nav-item dropdown"> 
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        User
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {userLoginStatus!='true' &&
                            <>
                            <Link to='/user-login' onClick={() => setMenu("user-login")} className={menu === "user-login" ? "active" : ""}>Login</Link>
                            <Link to='/user-register' onClick={() => setMenu("user-register")} className={menu === "user-register" ? "active" : ""}>Registarion</Link></>
                        }
                        {userLoginStatus=='true' &&
                            <>
                        <Link className="dropdown-item" to="user-dashboard">Dashboard</Link>
                        <Link className="dropdown-item" to="user-logout">Logout</Link></>
                        }
                    </ul>
                </li>
                <li className="nav-item dropdown"> 
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Chef
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {chefLoginStatus!='true' &&
                            <>
                            <Link to='/chef-login' onClick={() => setMenu("chef-login")} className={menu === "chef-login" ? "active" : ""}>Login</Link>
                            <Link to='/chef-register' onClick={() => setMenu("chef-register")} className={menu === "chef-register" ? "active" : ""}>Registarion</Link></>
                        }
                        {chefLoginStatus=='true' &&
                        <>
                        <Link className="dropdown-item" to="chef-dashboard">Dashboard</Link>
                        <Link className="dropdown-item" to="chef-logout">Logout</Link></>
                       }
                    </ul>
                </li>
                <Link to='/footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</Link>
            </ul>
            {/* <button onClick={() => setShowLogin(true)}>Sign in</button> */}
        </div>
    );
};

export default Navbar;
