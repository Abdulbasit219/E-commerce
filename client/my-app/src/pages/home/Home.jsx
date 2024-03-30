import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    
    const navigate = useNavigate();

    return (
        <Layout title={'Home'}>
            <div className="container px-6 py-16 mx-auto">
                <div className="items-center flex flex-col-reverse lg:flex-row">
                    <div className="w-full lg:w-1/2 my-6">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Best place to choose <br /> your <span className="text-[#FCBE69]">Products</span></h1>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>

                            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#1F2937] rounded-lg lg:w-auto hover:opacity-50" onClick={() => navigate('/allproduct')}>Shop Now</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home