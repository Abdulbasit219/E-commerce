import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import Eyebutton from "../../components/Eye/Eyebutton";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../../components/Spinner/Loading";
import { FaBolt } from "react-icons/fa6";

const ForgotPass = () => {
  const [showEye, setshoweye] = useState(false);
  const [resetData, setResetdata] = useState({
    email: "",
    question: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onchange = (e) => {
    const { name, value } = e.target;
    setResetdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const eyeToggle = (e) => {
    e.preventDefault();
    setshoweye(!showEye);
  };

  const handleSubmit = async (e) => {
    const { email, question, newPassword } = resetData;
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://api-to2k.onrender.com/api/v1/auth/forgotpassword",
        {
          email,
          question,
          newPassword,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, { duration: 10000 });
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
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
            Forgot Password
          </h2>
        </div>

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
                  value={resetData.email}
                  onChange={onchange}
                  placeholder="Enter Your Email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-none border-2 placeholder:text-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* security question */}
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-900"
              >
                Question
              </label>
              <div className="mt-2">
                <input
                  id="question"
                  type="text"
                  name="question"
                  required
                  value={resetData.question}
                  onChange={onchange}
                  placeholder="Enter Your Elementary School"
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
                  New Password
                </label>
              </div>

              <div className="mt-2 relative">
                <input
                  id="newPassword"
                  type={showEye ? "text" : "password"}
                  name="newPassword"
                  required
                  autoComplete="current-password"
                  value={resetData.password}
                  onChange={onchange}
                  placeholder="Enter New Password"
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
