import React from 'react'
import './CSS/LoginSign.css'
export const LoginSign = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Your Email' />
          <input type="password" placeholder='Enter Password' name="" id="" />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account <span>login here</span> </p>
        <div className="login-signup-agree">
      <input type="checkbox" name="" id="" />
      <p>By continuing , I agree terms and policy</p>
        </div>
      </div>
    </div>
  )
}
