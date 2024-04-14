import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);

// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index < all_product.length+1; index++) {
//        cart[index] = 0;
        
//     }
//     return cart;
// }

const ShopContextProvider = (props) => {
    // const [cartitem , setCartitem] = useState(getDefaultCart());
   
     
    // const addToCart = (itemId)=>{
    //         setCartitem((prev) => ({...prev , [itemId]:prev[itemId]+1}) )
            
    //         console.log(cartitem );
    //     }
     
    // const removeToCart = (itemId)=>{
    //         setCartitem((prev) => ({...prev , [itemId]:prev[itemId]-1}) )
    // }

    const[cart , setCart] = useState([]);

    console.log(cart);

    const addToCart = (item)=>{

        const existingItem = cart.findIndex((data) => data.id === item.id);
        if(existingItem !== -1){
            const update = [...cart];
            update[existingItem].quantity += 1;
            setCart(update)
        }
       else{

           setCart((prev) => [...prev , {...item , quantity :1} ] )
       }

       alert("your item is added to the cart")

    }

    const count = cart.reduce((total , q) =>( total + q.quantity),0)




    const handleDecrement = (index)=>{
        console.log("i am pressed");
        const dectement = [...cart];
        dectement[index].quantity -= 1;
        setCart(dectement)

    }
    const handleIncrement = (index)=>{
        console.log("i am pressed");

        const increment = [...cart];
        increment[index].quantity += 1;
        setCart(increment);
    }
    const totalAmount = cart.map((item)=> item.new_price * item.quantity).reduce((total , a)=> total + a , 0)


    const contextValue = { totalAmount,all_product,addToCart,count,cart,handleDecrement,handleIncrement};
    return (
        <ShopContext.Provider value={contextValue}>
            { props.children }
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;