import React from 'react';
import logo from '../images/logo.png'// Replace with the actual path to your logo image
import '../styles/index.css'; // Add CSS file for styling
import '../styles/welcome.css'; // Add CSS file for styling
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="welcome-app-bar">
            <div className="title-container-welcome">
                <img
                    src={logo}
                    alt="App Logo"
                    className="logo"
                />
                <div className="spacer"></div>
                <span className="app-name-welcome">Welcome to Rungta Connect 2.0</span>
            </div>
            <div className='btn-container'>
                <Link to= "/sign-in" className='welcome-buttons'><button className='welcome-button-login' > Login </button></Link>
                <Link to= "/sign-up" className='welcome-buttons'><button className='welcome-button-signup' > Register </button></Link>
            </div>
        </div>
    );
};

export default Welcome;
