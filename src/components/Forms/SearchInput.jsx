import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `https://api-to2k.onrender.com/api/v1/product/search/${values.keywords}`
      );
      setValues({ ...values, product: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <form className="relative flex items-center mx-auto" onSubmit={handleSearch}>
        <div className="w-full border-2 rounded-lg">
          <input
            type="text"
            className="text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder="Search brand name..."
            required
            value={values.keywords}
            onChange={(e) => setValues({ ...values, keywords: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 absolute right-0 text-sm font-medium text-black rounded-lg"
        >
          <IoSearch />
        </button>
      </form>
    </>
  );
};

export default SearchInput;

// <div className="relative mt-4 md:mt-0 lg:w-[40%] flex">

//     <input
//         type="text"
//         className="w-full py-2 pl-2 pr-4 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 "
//         placeholder="Search"
//         value={values.keywords}
//         onChange={(e) => setValues({ ...values, keywords: e.target.value })} />

//     <div>
//         <button className='hover:opacity-50' onClick={handleSearch}>
//             <span className="absolute inset-y-0 right-0 flex items-center pl-3 bg-[#FCBE69] rounded">
//                 <svg className="w-5 h-5 text-black transform -translate-x-1/2" viewBox="0 0 24 24" fill="none">
//                     <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
//                 </svg>
//             </span>
//         </button>
//     </div>

// </div>
