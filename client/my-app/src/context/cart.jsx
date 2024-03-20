import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let cartItem = localStorage.getItem('cart');
        if (cartItem) {
            setCart(JSON.parse(cartItem));
        }
    }, [])

    return (
        <cartContext.Provider value={[cart, setCart]}>
            {children}
        </cartContext.Provider>
    );
}

const useCart = () => useContext(cartContext);

export { useCart, CartProvider }