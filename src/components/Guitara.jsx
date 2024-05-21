import PropTypes from 'prop-types';

export default function Guitara({ guitar, addToCart }) {

    const { name, image, description, price } = guitar

    // const handleClick = (guitar) => {
    //     // Agregas en el array la guitara, pero ademas toma en cuenta lo que ya estaba
    //     //Tambien ademas de pasarle el cart como un props, es decir no hay porque pasar el state
    //     //Siendo que setCart sabe de su existencia
        
    //     setCart(preCart => [...preCart, guitar])
    //     console.log('Click', guitar)
    // }

    return (

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // Colocar un call back, para que se llame al realizar la accion y no al ejecutarse
                    // No agregar mucha logica en el template
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>

    )

}

// Tener cuidado con los props
Guitara.propTypes = {
    guitar: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        // Agrega otras propiedades aquí si es necesario
    }).isRequired,
};
