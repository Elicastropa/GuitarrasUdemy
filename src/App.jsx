import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
//import './App.css'

function App() {

  const initialCart =()=>{
const localStorageCart = localStorage.getItem("cart")
return localStorageCart ?JSON.parse(localStorageCart): []
  }
  const [data] = useState(db)
  const [cart, setCart]= useState(initialCart)

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    const itemExists=cart.findIndex((guitar)=>guitar.id===item.id)

    if(itemExists>=0){
     const updateCart =[...cart]
     updateCart[itemExists].quantity++
     setCart(updateCart)
    }else{
      item.quantity=1  
       setCart ( [...cart, item])
    }

 

  }

  function removeFromCart(id, ){
    setCart(prevCart=> prevCart.filter(guitar => guitar.id !== id))
  }

  function decreaseQuantity(id){
    const updateCart = cart.map(item=>{
      if(item.id ===id && item.quantity>1){
        return{
          ...item, 
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function increaseQuantity(id){
    const updateCart = cart.map(item=>{
      if(item.id ===id){
        return{
          ...item, 
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }


 
  return (
    <>
      <Header
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      clearCart={clearCart}
      
      />
    
   
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
      
        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar
            key={guitar.id}
            guitar={guitar}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            />
          
          ))}
        
      
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados -
            Elizabeth Castro
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
