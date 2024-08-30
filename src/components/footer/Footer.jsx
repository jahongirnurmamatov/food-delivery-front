import { assets } from '../../assets/assets'
import './Footer.css'

function Footer() {
  return (
    <div id='footer' className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quaerat aperiam vitae pariatur neque magni temporibus libero est inventore eligendi. Deleniti, corrupti dolorem! Est quisquam, voluptates modi accusamus quibusdam iste.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+998-999404612</li>
                    <li>jahongiir.nurmamatov@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer