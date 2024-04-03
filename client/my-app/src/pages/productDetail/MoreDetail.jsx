import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';


const MoreDetail = () => {

    const params = useParams();

    const [product, setProducts] = useState({});
    const [similarProduct, setSimilarProduct] = useState([]);

    //context
    const [cart, setCart] = useCart();
    
    // get product detail 
    const getProd = async () => {
        try {
            const { data } = await axios.get(`https://api-to2k.onrender.com/api/v1/product/get-product/${params.slug}`);
            setProducts(data?.product);
            getSimilarProducts(data?.product._id, data?.product?.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    // get similar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`https://api-to2k.onrender.com/api/v1/product/similar-product/${pid}/${cid}`);
            setSimilarProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    }

    //add item into cart
    const addItem = (product) => {
        const itemExists = cart.some(item => item._id === product._id);
        if (itemExists) {
            toast.success('Item Already Exists in cart');
            return;
        } else {
            setCart([...cart, product]);
            localStorage.setItem('cart', JSON.stringify([...cart, product]));
            toast.success('Items added to Cart successfully');
        }
    }

    useEffect(() => {
        if (params?.slug) { getProd(); }
    }, [params?.slug]);

    return (
        <Layout title={"Product Detail"}>
            <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 md:w-1/2 ">
                            <div className="sticky top-0 z-50 overflow-hidden ">

                                {/* main image */}
                                <div className="relative mb-6 lg:mb-10" style={{ height: '450px' }}>
                                    {product._id && (
                                        <img src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`} alt="" className="object-contain w-full h-full" />
                                    )}
                                </div>

                                <span className="text-lg font-medium">Similar Products</span>


                                <div className="flex-wrap hidden md:flex ">
                                    {similarProduct.length < 1 ?
                                        (
                                            <p>No product found</p>
                                        )
                                        :
                                        (
                                            similarProduct.map(similarProducts => (
                                                <div className="w-1/2 p-2 sm:w-1/4" key={similarProducts._id}>
                                                    <Link to={`/product/${similarProducts.slug}`}
                                                        className="block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300 ">
                                                        <img src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${similarProducts._id}`} alt="" className="object-cover w-full lg:h-32" />
                                                    </Link>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>

                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 ">
                            <div className="lg:pl-20">

                                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>

                                    {/* product name  */}
                                    <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                                        {product.name}
                                    </h2>

                                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                        {product.description}
                                    </p>

                                    {/* <!-- More content --> */}

                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                        <span>{product.price}&#36;</span>
                                    </p>
                                </div>


                                <div className="flex flex-wrap items-center ">

                                    {/* buy now butn */}
                                    <div className="mb-4 mr-4 lg:mb-0">
                                        <button
                                            className="w-full h-10 p-2 mr-4 bg-blue-500 text-gray-50 hover:bg-blue-600 rounded"
                                            onClick={() => addItem(product)}>
                                            Add to cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default MoreDetail