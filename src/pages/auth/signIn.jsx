import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Eyebutton from "../../components/Eye/Eyebutton";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { FaBolt } from "react-icons/fa6";
import Loading from "../../components/Spinner/Loading";

const signIn = () => {
  const [showEye, setshoweye] = useState(false);
  const [signInData, setSignData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const onchange = (e) => {
    const { name, value } = e.target;
    setSignData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const eyeToggle = (e) => {
    e.preventDefault();
    setshoweye(!showEye);
  };

  const handleSubmit = async (e) => {
    const { email, password } = signInData;
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `https://api-to2k.onrender.com/api/v1/auth/login`,
        { email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message, { duration: 10000 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("authData", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loading />
        </div>
      )}

      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
        
        {/* Header Logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="flex justify-center items-center gap-x-2 text-xl font-extrabold tracking-wide text-blue-600"
          >
            <span className="p-2 bg-blue-100 rounded-full">
              <FaBolt className="text-blue-600" />
            </span>
            <p>QuickMart</p>
          </Link>

          <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
           
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={signInData.email}
                  onChange={onchange}
                  placeholder="Enter Your Email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-none border-2 placeholder:text-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Input with Eye */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotPass"
                    className="font-semibold text-[#2563EB] hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showEye ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  value={signInData.password}
                  onChange={onchange}
                  placeholder="Enter Your Password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-none border-2 placeholder:text-gray-400 sm:text-sm"
                />
                <div
                  type="button"
                  onClick={eyeToggle}
                  className="absolute top-1/3 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <Eyebutton showEye={showEye} eyeToggle={eyeToggle} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#2563EB] hover:bg-white hover:text-[#2563EB] hover:border px-3 py-2 text-sm font-semibold text-white shadow-md transition duration-300"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/signup"
              className="font-semibold text-[#2563EB] hover:text-opacity-60 hover:underline"
            >
              Create Your Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default signIn;
