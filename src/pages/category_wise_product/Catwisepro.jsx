import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Spinner/Loading";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import ProductCard from "../../components/productCard/ProductCard";

const Catwisepro = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api-to2k.onrender.com/api/v1/product/product-category/${params?.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      toast.error("Error while loading product category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loading />
        </div>
      )}
      <Layout title={"Categories_products"}>
        <div className="flex flex-col justify-center items-center my-8 mx-8">
          {/* top heading */}
          <div className="text-2xl font-serif font-bold">
            {products.length < 1 ? (
              <p className="text-red-500">
                No Products Found from this Category At this time
              </p>
            ) : (
              <p className="text-green-500">
                {products.length} Products founds from this Category
              </p>
            )}
          </div>

          {/* <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
            {products.map((product, index) => (
              <div key={`${product._id}-${index}`} className="border p-2">
                <a className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>

                  <div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.description.substring(0, 20)}...
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price}&#36;
                    </p>

                    <div>
                      <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
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
          </div> */}

          <div className="container mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
            {products.map((product, index) => (
              <ProductCard
                key={`${product._id}-${index}`}
                product={product}
                navigate={navigate}
              />
            ))}
          </div>

        </div>
      </Layout>
    </>
  );
};

export default Catwisepro;

















// <div class="w-80 bg-white shadow rounded">        <div          class="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"          style="background-image: url('https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"        >          <div class="flex justify-between">            <input type="checkbox"/>            <button class="text-white hover:text-blue-500">              <svg                xmlns="http://www.w3.org/2000/svg"                class="h-6 w-6"                fill="none"                viewBox="0 0 24 24"                stroke="currentColor"              >                <path                  stroke-linecap="round"                  stroke-linejoin="round"                  stroke-width="2"                  d="M12 4v16m8-8H4"                />              </svg>            </button>          </div>          <div>        <span          class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none"        >          available        </span>          </div>        </div>        <div class="p-4 flex flex-col items-center">          <p class="text-gray-400 font-light text-xs text-center">            Hammond robotics          </p>          <h1 class="text-gray-800 text-center mt-1">Item name</h1>          <p class="text-center text-gray-800 mt-1">€1299</p>          <div class="inline-flex items-center mt-2">            <button              class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"            >              <svg                xmlns="http://www.w3.org/2000/svg"                class="h-6 w-4"                fill="none"                viewBox="0 0 24 24"                stroke="currentColor"              >                <path                  stroke-linecap="round"                  stroke-linejoin="round"                  stroke-width="2"                  d="M20 12H4"                />              </svg>            </button>            <div              class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"            >              2            </div>            <button              class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"            >              <svg                xmlns="http://www.w3.org/2000/svg"                class="h-6 w-4"                fill="none"                viewBox="0 0 24 24"                stroke="currentColor"              >                <path                  stroke-linecap="round"                  stroke-linejoin="round"                  stroke-width="2"                  d="M12 4v16m8-8H4"                />              </svg>            </button>          </div>          <button            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"          >            Add to order            <svg              xmlns="http://www.w3.org/2000/svg"              class="h-6 w-6 ml-2"              fill="none"              viewBox="0 0 24 24"              stroke="currentColor"            >              <path                stroke-linecap="round"                stroke-linejoin="round"                stroke-width="2"                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"              />            </svg>          </button>          <div class="flex justify-between w-full mt-4">            <div class="flex items-center text-gray-500">              <input id="input1" type="checkbox" class="mr-2"/>              <label for="input1" class="select-none cursor-pointer">Compare</label>            </div>            <div>              <button                class="py-1 px-4 bg-white text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">                Add to List                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"                     stroke="currentColor">                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>                </svg>              </button>            </div>          </div>        </div>      </div>