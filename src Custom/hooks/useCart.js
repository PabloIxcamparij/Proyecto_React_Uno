
import { useState, useEffect, useMemo } from 'react'
import { db } from "../data/db"

export const useCart = () => {

    const maxItems = 5
    const minItems = 1

    // recomendada para Apis, y uso para cuando no se usar una dependencia para consumir Apis 
    useEffect(() => {
        setData(db)
    }, [])


    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart())


    // Cada que cambie Cart se va a estar ejecuentado
    // Tomar en cuenta ademas que lo STATE EN REACR SON ASICRONOS 
    useEffect(() => {
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
            // tener en consideracion que es posible que en grandes cantidades no es recomendable su uso
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

    function clearCart() {
        setCart([])
    }


    
    // eslint-disable-next-line react/prop-types
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    // No va haer nada hasta que algo cambie, en este caso cuendo cart le pase algo
    // useMemo un hook para perfomance

    // eslint-disable-next-line react/prop-types
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    // aqui igual que se ejecute solo cuando el carrito cambie

    // State derivado, depende de otro state


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal

    }
}