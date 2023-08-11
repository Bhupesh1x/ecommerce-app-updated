import React, { useState } from "react";
import { categoriesData } from "../../static/data";
import uploadFile, { serverUrl } from "../../utils/uploadFile";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCurrUser } from "../../utils/getUser";

function CreateProductOrEvent({ isEvent }) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const currUser = getCurrUser();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    setStartDate(startDate);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  async function handleUpload(e) {
    setIsUploading(true);
    const imagesValue = e.target.files;
    const images = await Promise.all(
      [...imagesValue]?.map(async (file) => {
        const url = await uploadFile(file);
        return url;
      })
    );
    setImages(images);
    setIsUploading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () =>
      toast(`Creating new ${isEvent ? "event" : "product"}...`);
    try {
      const data = {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        images,
        shopId: currUser?._id,
      };

      const payload = !isEvent
        ? data
        : { ...data, start_date: startDate, end_date: endDate };

      const url = !isEvent
        ? `${serverUrl}/product/create-product`
        : `${serverUrl}/event/create-event`;

      if (isUploading) {
        return toast.error("Please wait for image to upload", {
          id: "Uplaoding",
        });
      }

      await axios.post(url, payload, {
        withCredentials: true,
      });
      toast.success(
        `New ${isEvent ? "event" : "product"} created successfully`,
        {
          id: notification,
        }
      );

      navigate(`${isEvent ? "/dashboard-events" : "/dashboard"}`);
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto max-h-[82vh] overflow-y-scroll">
      <h1 className="text-center text-xl font-semibold mb-3">
        Create {isEvent ? "Event" : "Product"}
      </h1>
      <form onSubmit={handleSubmit}>
        <p className="font-semibold my-1">
          Name <span className="ml-2 text-red-500">*</span>
        </p>
        <input
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your product name..."
          aria-required
        />
        <p className="font-semibold my-1 mt-3">
          Description <span className="ml-2 text-red-500">*</span>
        </p>
        <textarea
          cols="30"
          rows="8"
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your product description..."
          aria-required
        />
        <p className="font-semibold my-1 mt-3">
          Category <span className="ml-2 text-red-500">*</span>
        </p>
        <select
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          aria-required
        >
          <option value="Choose a category">Choose a category</option>
          {categoriesData &&
            categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
        </select>
        <p className="font-semibold my-1 mt-3">Tags</p>
        <input
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter your product tags..."
        />
        <p className="font-semibold my-1 mt-3">Price</p>
        <input
          type="number"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Enter your product price..."
        />
        <p className="font-semibold my-1 mt-3">
          Price (With Discount) <span className="ml-2 text-red-500">*</span>
        </p>
        <input
          type="number"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          placeholder="Enter your product discount price..."
        />
        <p className="font-semibold my-1 mt-3">
          Product Stock <span className="ml-2 text-red-500">*</span>
        </p>
        <input
          type="number"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          required
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter your product stock..."
        />
        <label
          htmlFor="file-input"
          className="mt-4 flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
        >
          <span>{isUploading ? "Uploading Images" : "Upload Images"}</span>
          <input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleUpload(e)}
            className="hidden"
            multiple
          />
        </label>
        <div className="w-full flex items-center flex-wrap">
          {images &&
            images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt=""
                className="h-[100px] w-[100px] object-cover m-3"
              />
            ))}
        </div>
        {isEvent ? (
          <>
            <p className="font-semibold my-1 mt-3">
              Event Start Date <span className="ml-2 text-red-500">*</span>
            </p>
            <input
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              required
              type="date"
              name="price"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              placeholder="Enter your event product stock..."
            />
            <p className="font-semibold my-1 mt-3">
              Event End Date <span className="ml-2 text-red-500">*</span>
            </p>
            <input
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              required
              type="date"
              name="price"
              id="end-date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              placeholder="Enter your event product stock..."
            />
          </>
        ) : null}

        <button
          type="submit"
          className="bg-black text-white mt-4 px-8 py-3 rounded-lg w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateProductOrEvent;
