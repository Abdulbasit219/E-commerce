import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useCart } from '../../context/cart'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import CartModal from '../../components/CartModal';

const Cartproduct = () => {

    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [totalCost, setTotalCost] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    //calculate Total Bills
    const calculateTotalCost = () => {
        let total = 0;
        cart?.forEach(product => {
            total += product.price * product.quantity; // Multiply price by quantity
        });
        setTotalCost(total);
    }

    //remove items from cart
    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === productId);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart));
        calculateTotalCost();
    }

    //for Product Quantity increase
    const handleIncrement = (product) => {
        const updatedCart = cart.map(item => {
            if (item._id === product._id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    //for Product Quantity decrease
    const handleDecrement = (product) => {
        const updatedCart = cart.map(item => {
            if (item._id === product._id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    useEffect(() => {
        calculateTotalCost();
    }, [cart]);

    return (
        <Layout title={'Ecommerce Cart'}>
            <div className="bg-gray-100 p-4">
                <div className="container mx-auto mt-10">

                    {/* main hadding */}
                    <div className='text-center font-bold text-2xl font-serif'>
                        <p>{`${auth?.token && auth?.user?.name}`}</p>
                        <p>{cart?.length > 1 ? `you have ${cart.length} items in your cart 
                        ${auth?.token ? '' : 'please Login to checkout'}`
                            : 'your Cart is Empty'}</p>
                    </div>

                    {/* check cart */}
                    {auth?.token && cart?.length > 0 && (

                        <div className="flex flex-col md:flex-row shadow-md my-10">
                            <div className="md:w-3/4 bg-white px-10 py-10">

                                {/* Shopping cart hedings */}
                                <div className="flex justify-between border-b pb-8">
                                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                                    <h2 className="font-semibold text-2xl">{cart?.length} Items</h2>
                                </div>
                                <div className="flex mt-10 mb-5">
                                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5 md:w-1/5 text-center">Quantity</h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase md:w-1/5 text-center hidden md:block">Total</h3>
                                </div>


                                {cart?.map((p) => (
                                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={p._id}>
                                        <div className="flex w-2/5">
                                            <div className="w-20">
                                                <img className="h-24" src={`http://localhost:8080/api/v1/product/get-productphoto/${p._id}`} alt="" />
                                            </div>
                                            <div className="flex flex-col justify-between items-start ml-4 flex-grow">
                                                <span className="font-bold text-sm">{p.name.substring(0, 30)}...</span>
                                                <button className="text-red-500 text-xs hover:text-red-800">{p.name.substring(0, 30)}...</button>
                                                <button className="font-semibold hover:text-red-500 text-gray-500 text-xs pointer" onClick={() => removeFromCart(p._id)}>Remove</button>
                                            </div>
                                        </div>

                                        {/* plus minus quantity btn */}
                                        <div className="flex justify-center md:w-1/5 w-2/5">
                                            <button onClick={() => handleDecrement(p)}>-</button>


                                            <input className="mx-2 border text-center w-8"
                                                type="text"
                                                value={p.quantity}
                                                readOnly
                                            />

                                            <button onClick={() => handleIncrement(p)}>+</button>

                                        </div>

                                        <span className="text-center w-1/5 font-semibold text-sm hidden md:block">&#36;{p.price}</span>
                                        <span className="text-center w-1/5 font-semibold text-sm">&#36;{p.price * p.quantity}</span>

                                    </div>
                                ))}

                                <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                    Continue Shopping
                                </a>

                            </div>

                            {/* order summary total checkout */}
                            <div id="summary" className="md:w-1/4 px-8 py-10">
                                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                <div className="flex justify-between mt-10 mb-5">
                                    <span className="font-semibold text-sm uppercase">Items {cart?.length}</span>
                                    <span className="font-semibold text-sm">&#36;{totalCost}</span>
                                </div>

                                <div className="border-t mt-8">
                                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                        <span>Total cost</span>
                                        <span>&#36;{totalCost}</span>
                                    </div>
                                    <button
                                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            localStorage.removeItem('cart');
                                        }}>Checkout</button>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* check user login or not (button) */}
                    {!auth?.token && cart?.length > 0 && (
                        <div className="text-center">
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase p-2 rounded mt-2"
                                onClick={() => navigate('/signin',
                                    {
                                        state: '/cart'
                                    }
                                )}>Login</button>
                        </div>
                    )}

                </div>

                {isModalOpen && (
                    <CartModal
                        closeModal={() => setIsModalOpen(false)}
                        totalPrice={totalCost}
                        totalItem={cart.length} />
                )}

            </div>
        </Layout >
    )
}

export default Cartproduct