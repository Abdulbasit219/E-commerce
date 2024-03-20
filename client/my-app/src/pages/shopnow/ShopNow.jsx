import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import Prices from '../../components/prices'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import Slider from '../../components/Slider/Slider'

const ShopNow = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalproducts, setTotalproducts] = useState(0);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    //get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data?.products);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    //get All Categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/categories');
            if (data.success) {
                setCategories(data.category)
            }
        } catch (e) {
            console.log(e);
        }
    }

    //filter categories
    const handleFilter = (value, id) => {
        let allcategories = [...checked];
        if (value) {
            allcategories.push(id)
        } else {
            allcategories = allcategories.filter((c) => c !== id)
        }
        setChecked(allcategories)
    }

    //get filtered products
    const getFilteredProducts = async () => {
        try {
            const { data } = await axios.post(`http://localhost:8080/api/v1/product/filter-product`, { checked, radio });
            setProducts(data?.products)
        } catch (e) {
            console.log(e)
        }
    }

    //get total count
    const getTotalCount = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count');
            setTotalproducts(data?.total);
        } catch (e) {
            console.log(e);
        }
    }

    //load more products
    const loadMore = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);

            // const newProducts = data?.products.filter(newProduct => !products.some(existingProduct => existingProduct._id === newProduct._id));

            setProducts([...products, ...data?.products])
            // setProducts([...products, ...newProducts]);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //add item to cart
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
        if (page === 1) return
        loadMore();
    }, [page])

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts()
    }, [])

    useEffect(() => {
        if (checked.length || radio.length) getFilteredProducts();
    }, [checked, radio])

    useEffect(() => {
        getCategories();
        getTotalCount();
    }, [])

    return (
        <Layout title={"All Product - Best Offers"}>
            <Slider />
            <div className='flex flex-wrap m-2'>

                <div className='w-[20%] border-2 hidden md:inline'>

                    <h1 className='font-bold text-2xl m-4'>Filter By Category</h1>
                    <div className='flex flex-col ml-4'>
                        {categories?.map((category) => (
                            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)} className='mt-2'>
                                {category.name}
                            </Checkbox>
                        ))}
                    </div>

                    <h1 className='font-bold text-2xl m-4'>Filter By Price</h1>
                    <div className='flex flex-col ml-4'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((Price) => (
                                <div key={Price._id} className='mt-1'>
                                    <Radio value={Price.array}>{Price.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className='m-4'>
                        <button className='className="ml-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => window.location.reload()}>Clear Filter</button>
                    </div>

                    <div>

                    </div>
                </div>

                <div className="bg-white w-[80%] mx-auto">
                    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                        <h2 className='font-bold text-center text-4xl'>All Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
                            {products.map((product, index) => (
                                <div key={`${product._id}-${index}`} className='border p-2'>
                                    <a className="group">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={`http://localhost:8080/api/v1/product/get-productphoto/${product._id}`}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{product.description.substring(0, 20)}...</p>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}&#36;</p>

                                            <div className='flex justify-center items-center'>
                                                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate(`/product/${product.slug}`)}>
                                                    More Detail
                                                </button>
                                                <button className="ml-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => {
                                                        addItem(product);
                                                    }
                                                    }>
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className='mt-4'>
                            {products && products.length < totalproducts && (
                                <button className='className="ml-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}>
                                    {loading ? 'loading ...' : 'Loadmore'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default ShopNow