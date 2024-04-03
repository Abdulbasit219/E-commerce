import Layout from '../../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={'Search Item'}>
            <div className='w-[80%] flex flex-col items-center mx-auto py-6'>
                
                <div className='font-bold text-center text-2xl'>
                    <div>Search Result</div>
                    <div>{values?.product.length < 1 ? 'No product found' : `${values.product.length} Products Found`}</div>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
                        {values?.product.map((product) => (
                            <div key={product._id} className='border p-2'>
                                <a key={product.id} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={`http://localhost:8080/api/v1/product/get-productphoto/${product._id}`}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
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

            </div>
        </Layout>
    )
}

export default Search