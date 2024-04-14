import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import insta_icom from '../Assets/instagram_icon.png'
import pintester_icom from '../Assets/pintester_icon.png'
import whatsapp_icom from '../Assets/whatsapp_icon.png'
export const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className='footer-links'>
                <li>Company </li>
                <li>Product</li>
                <li>Offices </li>
                <li>About </li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={insta_icom} alt="" />
                </div>
                <div className="footer-icon-container">
                    <img src={pintester_icom} alt="" />
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp_icom} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @2024 All Rights Reserved</p>
            </div>

        </div>
    )
}
