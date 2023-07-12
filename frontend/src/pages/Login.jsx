import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../utils/uploadFile";
import { toast } from "react-hot-toast";
import { getCurrUser } from "../utils/getUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const currUser = getCurrUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Logging you in...");
    const data = {
      email,
      password,
    };
    try {
      const result = await axios.post(`${serverUrl}/user/login-user`, data, {
        withCredentials: true,
      });
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data.user));
      toast.success("Login Sucessfull", {
        id: notification,
      });
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data, {
        id: notification,
      });
    }
  }

  useEffect(() => {
    if (currUser) {
      navigate("/");
    }
  }, [currUser, navigate]);

  return (
    <div className="h-[100vh]  flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[80%] md:w-[40%] lg:w-[30%] px-8 py-4 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-semibold my-4 text-center">
          Login To Your Account
        </h1>
        <p className="font-semibold my-1">Email Address</p>
        <input
          type="email"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <p className="mt-3 my-1 font-semibold">Password</p>
          <input
            type={isVisible ? "text" : "password"}
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isVisible ? (
            <AiOutlineEye
              className="absolute right-2 top-8 cursor-pointer text-gray-600"
              size={25}
              onClick={() => setIsVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-8 cursor-pointer text-gray-600"
              size={25}
              onClick={() => setIsVisible(true)}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3 gap-2">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <p>Remember Me</p>
          </div>
          <p className="text-blue-500 font-semibold cursor-pointer">
            Forgot your password?
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 mt-3 w-full rounded-md text-white font-semibold"
        >
          Submit
        </button>
        <p className="my-4">
          Not have a account?{" "}
          <Link to="/sign-up">
            <span className="text-blue-500 font-semibold cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
