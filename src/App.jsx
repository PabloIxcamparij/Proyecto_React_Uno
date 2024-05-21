
import { useState, useEffect } from 'react'
import Guitara from './components/Guitara'
import Header from './components/Header'
import { db } from "./data/db.js"
function App() {

  // React developer tools, arboles de componenetes, hooks y props
  // No declarar hooks dentro de una condicional, no pueden estar dentro de ninguna funcion

  const initialCart = () => {
    const localStorageCart =  localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart())

  const maxItems = 5
  const minItems = 1
  
  // Cada que cambie Cart se va a estar ejecuentado
  // Tomar en cuenta ademas que lo STATE EN REACR SON ASICRONOS 
  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  // recordar que el state debe de ser insmutable
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id == item.id)

    if (itemExists < 0) {
      // Para que tampoco supere el limite

      item.quantity = 1;
      setCart([...cart, item])

      console.log('Agregado', item)

    } else {
      // Para actualizar un state, se hacer una copia
      // tener en consideracion que es posible que en grandes cantidad
      // no es recomendable su uso

      if (cart[itemExists].quantity >= maxItems) return

      const updateCart = [...cart]
      updateCart[itemExists].quantity++;
      setCart(updateCart)
      console.log("Ya existe")
    }

  }

  function removeFromCart(id) {
    setCart(preCart => preCart.filter(guitar => guitar.id !== id))
    console.log("eliminando", id)
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < maxItems) {
        // Al item encontrado se le agrega a la cantidad
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      // Los demas son regresados como estan 
      return item

    })

    setCart(updatedCart)

    console.log("incrementado cantidad", id)


  }

  function decreaseQuantity(id) {

    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > minItems) {

        // Al item encontrado se le agrega a la cantidad
        return {
          ...item,
          quantity: item.quantity - 1
        }

      }
      // si no cumple con la condicicon regresa igual
      return item

    })

    setCart(updatedCart)

    console.log("Decrementando cantidad", id)
  }

  function clearCart(){
    setCart([])
  }

  // Creacion de Hooks propios

  // recomendada para Apis, y uso para cuando no se usar una dependencia para consumir Apis 
  useEffect(() => {
    setData(db)
  }, [])

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar) => (
            <Guitara key={guitar.id} guitar={guitar}
              addToCart={addToCart} />
          ))}


        </div>
      </main >

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App