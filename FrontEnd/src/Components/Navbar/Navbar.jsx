import React, { useContext, useRef, useState } from 'react'
import './Nav.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, NavLink } from 'react-router-dom'
import nav_dropdown from '../Assets/dropdown_icon.png'
import { ShopContext } from '../../Context/ShopContext'
export const Nav = () => {
    const [menu , setmenu] = useState("shop");
    const menuRef = useRef()

    const dropToggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
         e.target.classList.toggle('open')
        console.log("i am working");
    }

    const {count} = useContext(ShopContext)

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p onClick={()=>{setmenu("shop")}}> <Link to = '/' style={{textDecoration:"none" , color: "black"}}>SHOPPER </Link>  </p>
            </div>
            <img className='nav-dropdown' onClick={dropToggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setmenu("shop")}}> <Link to = '/' style={{textDecoration:"none" ,  color: "black"}}>Shop</Link> {menu === "shop" ?<hr />   : <></>} </li>
                <li onClick={()=>{setmenu("men")}}> <Link to='/men' style={{textDecoration:"none" , color: "black"}}>Men </Link> {menu === "men" ?<hr /> : <></>}</li>
                <li onClick={()=>{setmenu("women")}}> <Link to='/women' style={{textDecoration:"none" , color: "black"}} >Women</Link>  {menu === "women" ?<hr /> : <></>}</li>

                <li onClick={()=>{setmenu("kid")}}> <Link to = '/kid' style={{textDecoration:"none" , color: "black"}}>Kids</Link>  {menu === "kid" ?<hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'> <button>Login</button> </Link>
               <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
                <div className="nav-cart-count">{count}</div>
            </div>
        </div>
    )
}
