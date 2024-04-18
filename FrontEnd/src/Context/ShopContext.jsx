import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);



const ShopContextProvider = (props) => {
   
    const [all_product , setAllProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproduct')
        .then((response)=>response.json())
        .then(({ data }) => setAllProduct(data)) // Destructuring the response object
       

    }, [])
    


    const[cart , setCart] = useState([]);


    console.log(cart);

    const addToCart = (item)=>{

      try {
          const existingItem = cart.findIndex((data) => data.id === item.id);
          if(existingItem !== -1){
              const update = [...cart];
              update[existingItem].quantity += 1;
              setCart(update)
          }
         else{
             setCart((prev) => [...prev , {...item , quantity :1} ] )
         }

         // from here  
         if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart' , {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json' 
                } ,
                body:JSON.stringify({"item" : item.id})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
         }

  
         alert("your item is added to the cart")
      } catch (error) {
        console.error('Error adding item to cart:', error);
        alert("Error adding item to cart");
      }

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


    const handleRemove = (index) => {
        // Add comment to explain the change
        // This function removes the item at the specified index from the cart state.
        const updatedCart = [...cart]; // Create a copy of the cart state to avoid mutation
        updatedCart.splice(index, 1); // Remove the item at the given index
        setCart(updatedCart); // Update the cart state with the modified array
      };
    


    const contextValue = { totalAmount,all_product,addToCart,count,cart,handleDecrement,handleIncrement,handleRemove};
    return (
        <ShopContext.Provider value={contextValue}>
            { props.children }
            
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;