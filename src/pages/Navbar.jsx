// TopAppBar.js
import React from 'react';
import '../styles/navbar.css'; // Add CSS file for styling
import logo from '../images/logo.png'// Replace with the actual path to your logo image
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.alert('You have been logged out');
            // Redirect to the homepage after logout
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div className="top-app-bar">
            <div className="logo-container">
                <img
                    src={logo} // Replace with the actual path to your logo image
                    alt="App Logo"
                    className="logo"
                />
                <span className="app-name">Rungta Connect 2.0</span>
            </div>
            <div className="navigation-tabs">
                <button className="nav-button">Explore</button>
                <button className="nav-button">Teachers</button>
                <button className="nav-button">Alumni</button>
                <button className="nav-button" onClick={handleLogout}>
                    Logout
                </button>
                {/* <Link to="/"> <button className="nav-button">Logout</button> </Link> */}
            </div>
        </div>
    );
};

export default Navbar;
