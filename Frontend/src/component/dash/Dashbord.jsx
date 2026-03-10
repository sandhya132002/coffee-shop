import React from 'react'
import banner from '../../assets/banner.jpg';
import './Dashboard.css';

function Dashbord() {
    return (
        <div 
            className="dashboard-container"
            style={{ backgroundImage: `url(${banner})` }}  // <-- backticks used here
        >
            {/* Text Overlay */}
            <div className="text-overlay">
                <div>
                    <h1>Welcome to Coffee Shop</h1>
                    <p>Your favorite coffee, just a click away!</p>
                </div>
                <div>
                    <button className="dashboard-button">
                        <a href="#contact">Contact Us</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashbord;
