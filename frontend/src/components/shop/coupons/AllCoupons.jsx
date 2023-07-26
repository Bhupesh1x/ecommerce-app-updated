import React, { useEffect, useMemo, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { getCurrUser } from "../../../utils/getUser";
import { serverUrl } from "../../../utils/uploadFile";
import axios from "axios";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "../../modal/Modal";

function AllCoupons() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState();
  const [minAmount, setMinAmount] = useState();
  const [maxAmount, setMaxAmount] = useState();
  const currUser = getCurrUser();
  const [coupouns, setCoupouns] = useState([]);

  function handleOpenModel() {
    setOpen(true);
  }

  async function getAllCouponCode() {
    try {
      const result = await axios.get(
        `${serverUrl}/couponCode/get-coupon-code/${currUser._id}`,
        {
          withCredentials: true,
        }
      );
      setCoupouns(result.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getAllCouponCode();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast(`Creating new coupon...`);
    try {
      const data = {
        name,
        value,
        minAmount,
        maxAmount,
        shop: currUser,
      };

      await axios.post(`${serverUrl}/couponCode/create-coupon-code`, data, {
        withCredentials: true,
      });
      toast.success(`New coupon code created sucessfully`, {
        id: notification,
      });
      setOpen(false);
      getAllCouponCode();
    } catch (error) {
      toast.error(error?.response?.data, {
        id: notification,
      });
    }
  }

  async function handleDelete(id) {
    const notification = toast.loading("Deleting Your Coupon Code !");
    const url = `${serverUrl}/couponCode/delete-shop-coupon-code/${id}`;
    try {
      const result = await axios.delete(url, {
        withCredentials: true,
      });
      toast.success(result.data, {
        id: notification,
      });
      getAllCouponCode();
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
      {
        field: "name",
        headerName: "Coupon Code",
        minWidth: 180,
        flex: 1.4,
      },
      {
        field: "value",
        headerName: "Value",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "Delete",
        flex: 0.8,
        minWidth: 120,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => handleDelete(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            </>
          );
        },
      },
    ];
  }, []);

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        value: item.value + " %",
      });
    });

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto">
      <button
        className="bg-black text-white px-4 py-2 rounded-lg float-right"
        onClick={handleOpenModel}
      >
        Create Coupon
      </button>

      <div className="mt-14">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {open && (
        <Modal>
          <RxCross1
            size={20}
            onClick={() => setOpen(false)}
            className="cursor-pointer float-right"
          />
          <>
            <h1 className="text-center text-2xl font-semibold my-4">
              Create Coupon Code
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
                placeholder="Enter your coupon code name..."
                aria-required
              />
              <p className="font-semibold my-1 mt-3">
                Discount Percentage <span className="ml-2 text-red-500">*</span>
              </p>
              <input
                type="number"
                min={0}
                max={100}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your coupon code Discount Percentage..."
                aria-required
              />
              <p className="font-semibold my-1 mt-3">Min Amount</p>
              <input
                type="number"
                min={0}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Enter your coupon code Min Amount..."
              />
              <p className="font-semibold my-1 mt-3">Max Amount</p>
              <input
                type="number"
                min={0}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Enter your coupon code Max Amount..."
              />
              <button
                className="bg-black text-white px-4 py-2 rounded-lg my-6 w-full"
                type="submit"
              >
                Create
              </button>
            </form>
          </>
        </Modal>
      )}
    </div>
  );
}

export default AllCoupons;
