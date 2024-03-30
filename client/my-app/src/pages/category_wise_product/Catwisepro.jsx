import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Catwisepro = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params?.slug}`);

            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            toast.error('Error while loading product category');
        }
    }

    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params?.slug])

    return (
        <Layout title={'Categories_products'}>
            <div className='flex flex-col justify-center items-center my-8 mx-8'>
                <div className='text-2xl font-serif font-bold'>
                    {products.length < 1
                        ?
                        <p>No Products Found from this Category At this time</p>
                        :
                        <p>{products.length} Products founds from this Category</p>
                    }

                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
                    {products.map((product, index) => (
                        <div key={`${product._id}-${index}`} className='border p-2'>
                            <a className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={`http://localhost:8080/api/v1/product/get-productphoto/${product._id}`} className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>

                                <div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.description.substring(0, 20)}...</p>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}&#36;</p>

                                    <div>
                                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate(`/product/${product.slug}`)}>
                                            More Detail
                                        </button>
                                        <button className="ml-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    )
}

export default Catwisepro