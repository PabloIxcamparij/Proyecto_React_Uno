
import { useState, useEffect, useMemo } from 'react'
import { db } from "../data/db"
import type { Guitar, CarItem, GuitarID } from '../types/index.ts'


export const useCart = () => {

    const maxItems = 5
    const minItems = 1

    // Como implementar en initialCar el CarItem
    const initialCart = () : CarItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart())
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex ((guitar:Guitar) => guitar.id == item.id)
        
        if (itemExists < 0) {
            const newItem : CarItem = {...item, quantity : 1}
            setCart([...cart, newItem])

            console.log('Agregado', item)

        } else {

            if (cart[itemExists].quantity >= maxItems) return

            const updateCart = [...cart]
            updateCart[itemExists].quantity++;
            setCart(updateCart)
            console.log("Ya existe")
        }

    }

    function removeFromCart(id : GuitarID) {
        setCart(preCart => preCart.filter((guitar:Guitar) => guitar.id !== id))
        console.log("eliminando", id)
    }

    function increaseQuantity(id : GuitarID ) {
        const updatedCart = cart.map((item : CarItem)=> {
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

    function decreaseQuantity(id : GuitarID) {
        const updatedCart = cart.map((item : CarItem) => {
            if (item.id === id && item.quantity > minItems) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item

        })

        setCart(updatedCart)

        console.log("Decrementando cantidad", id)
    }

    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total : number, item : CarItem) => total + (item.quantity * item.price), 0), [cart])

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