import React, { useState } from 'react'
import './CSS/LoginSign.css'
export const LoginSign = () => {

  const [state , setState] = useState("Login")

  // data from input field 

  const [formData , setFormData ] = useState({
    name:"",
    email:"",
    password:""
    })

    // change handler for taking input data 

    const changeHandler = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }




  // log in 

  const logIn = async ()=>{
    console.log("I am logging in", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
  
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.message);
    }
  }


  // sign up
  const signUp = async ()=>{
    console.log(" i am sign up",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json({success:true}))
    .then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token' , responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.message)
    }

  }




  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state === 'Sign Up' ?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' /> :<></> } 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Enter Password'  id="" />
        </div>
        <button onClick={()=>{state === 'Login'? logIn() : signUp()}} >Continue</button>
        {state === 'Sign Up'? <p className='loginsignup-login'>Already have an account <span onClick={()=>{setState('Log in')}}>login here</span> </p> :  <p className='loginsignup-login'>Create an account <span onClick={()=>{setState('Sign Up')}}>click here</span> </p> }
        
       
        <div className="login-signup-agree">
      <input type="checkbox" name="" id="" />
      <p>By continuing , I agree terms and policy</p>
        </div>
      </div>
    </div>
  )
}
