import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import uploadFile, { serverUrl } from "../utils/uploadFile";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getCurrUser } from "../utils/getUser";

function ShopCreatePage() {
  const currUser = getCurrUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(currUser?.email ? currUser?.email : "");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setAvatar(url);
    setIsUploading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Registering a new seller...");
    try {
      const data = {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
      };

      if (isUploading) {
        return toast.error("Please wait for shop logo to upload", {
          id: "Uplaoding",
        });
      }

      const result = await axios.post(`${serverUrl}/shop/create-shop`, data, {
        withCredentials: true,
      });
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data.user));
      toast.success("Register as a new seller successfull", {
        id: notification,
      });

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    if (currUser && !currUser.role === "Seller") {
      navigate("/");
    } else if (currUser && currUser.role === "Seller") {
      navigate("/dashboard");
    }
  }, [currUser, navigate]);

  return (
    <div className="h-[100vh]  flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[85%] md:w-[50%] lg:w-[35%] px-8 py-4 sm:px-10 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold my-4 text-center">
          Register as a seller
        </h1>
        <p className="font-semibold my-1">Shop Name</p>
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
          disabled={currUser}
        />

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
            <span>
              {isUploading ? "Uploading a Image" : "Upload a Shop Logo"}
            </span>
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

        <p className="mt-3 font-semibold my-1">Address</p>
        <input
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="mt-3 font-semibold my-1">Zip Code</p>
        <input
          type="number"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
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

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 mt-3 w-full rounded-md text-white font-semibold"
        >
          Submit
        </button>
        <p className="my-3">
          Already have a account?{" "}
          <Link to="/shop-login">
            <span className="text-blue-500 font-semibold cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ShopCreatePage;
