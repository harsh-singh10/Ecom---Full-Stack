import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);



const ShopContextProvider = (props) => {
   
    const [all_product , setAllProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproduct')
        .then((response)=>response.json())
        .then(({ data }) => setAllProduct(data)) // Destructuring the response object

        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/getcart' , {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json' 
                } ,
                body:JSON.stringify(),
            })
            .then((res)=>res.json())
            .then((data)=>{setCart(data)})
        }


    }, [])
    


     const[cart , setCart] = useState([]);
   
    ///////
 


    //////


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

    //  const count = cart.reduce((total , q) =>( total + q.quantity),0)
    const count = cart.length > 0 ? cart.reduce((total, q) => (total + q.quantity), 0) : 0;



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


    const handleRemove = (item) => {
        // Find the index of the item to remove
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
          // Create a copy of the cart array
          const updatedCart = [...cart];
          // Remove the item at the found index
          updatedCart.splice(index, 1);
          // Update the cart state with the modified array
          setCart(updatedCart);
      
          
          // Send a request to the server to remove the item from the backend database
          if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
              },
              body: JSON.stringify({ id: item.id }) // Send the ID of the removed item
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error removing item from cart:', error));
          }
        }
      };
    


    const contextValue = { totalAmount,all_product,addToCart,count,cart,handleDecrement,handleIncrement,handleRemove};
    return (
        <ShopContext.Provider value={contextValue}>
            { props.children }
            
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;