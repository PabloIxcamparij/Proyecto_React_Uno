import { useMemo } from "react"


// eslint-disable-next-line react/prop-types
export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

    // eslint-disable-next-line react/prop-types
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    // No va haer nada hasta que algo cambie, en este caso cuendo cart le pase algo
    // useMemo un hook para perfomance

    // eslint-disable-next-line react/prop-types
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    // aqui igual que se ejecute solo cuando el carrito cambie

    // State derivado, depende de otro state

    return (

        <header className="py-5 header">
            <div className="container-xl">
                <div className="row sjustify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {
                                    isEmpty ? (
                                        <p className="text-center">El carrito esta vacio</p>

                                    ) : (

                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    // eslint-disable-next-line react/prop-types
                                                    cart.map((guitar) => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                            </td>
                                                            <td>{guitar.name}</td>
                                                            <td className="fw-bold">
                                                                {guitar.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => decreaseQuantity(guitar.id)}

                                                                >
                                                                    -
                                                                </button>
                                                                {guitar.quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => increaseQuantity(guitar.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => removeFromCart(guitar.id)}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>

                                    )}

                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                <button className="btn btn-dark w-100 mt-3 p-2"
                                    type="button"
                                    onClick={() => clearCart()}
                                >Vaciar Carrito</button>
                                clearCart
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )

}