import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import uploadFile, { serverUrl } from "../utils/uploadFile";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getCurrUser } from "../utils/getUser";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const currUser = getCurrUser();

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setAvatar(url);
    setIsUploading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Registering as a new user...");
    try {
      const data = {
        name,
        email,
        password,
        avatar,
      };

      if (isUploading) {
        return toast.error("Please wait for image to upload", {
          id: "Uplaoding",
        });
      }

      const result = await axios.post(`${serverUrl}/user/create-user`, data, {
        withCredentials: true,
      });
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data.user));
      toast.success("Register as a new user Successfull", {
        id: notification,
      });

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.statusText);
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
        className="bg-white w-[85%] md:w-[50%] lg:w-[35%] px-8 py-4 sm:px-10 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold my-4 text-center">
          Register as new user
        </h1>
        <p className="font-semibold my-1">Full Name</p>
        <input
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-3 font-semibold my-1">Email Address</p>
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

        <div className="my-3 flex items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <RxAvatar className="h-9 w-9 rounded-full text-gray-600" />
          )}

          <label
            htmlFor="file-input"
            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <span>{isUploading ? "Uploading a Image" : "Upload a Image"}</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 mt-2 w-full rounded-md text-white font-semibold"
        >
          Submit
        </button>

        <p className="my-3">
          Already have a account?{" "}
          <Link to="/login">
            <span className="text-blue-500 font-semibold cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
