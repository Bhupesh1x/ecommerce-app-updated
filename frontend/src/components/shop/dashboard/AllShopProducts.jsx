import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../../utils/uploadFile";
import axios from "axios";
import { getCurrUser } from "../../../utils/getUser";
import { toast } from "react-hot-toast";
import { getAllProductsOfShop } from "../../../redux/productSlice";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function AllShopProducts() {
  const dispatch = useDispatch();
  const user = getCurrUser();
  const navigate = useNavigate();
  const shopAllProducts = useSelector((state) => state.productShop.value);

  async function getAllShopProducts() {
    try {
      const result = await axios.get(
        `${serverUrl}/product/get-products-by-shop-id/${user._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllProductsOfShop(result.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  async function handleDelete(id) {
    const notification = toast.loading("Deleting Your Product!");
    try {
      const result = await axios.delete(
        `${serverUrl}/product/delete-shop-product/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data, {
        id: notification,
      });
      getAllShopProducts();
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getAllShopProducts();
  }, []);

  function handleNavigate(product_name) {
    navigate(`/product/${product_name}`);
  }

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 180,
        flex: 1.4,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "Stock",
        headerName: "Stock",
        type: "number",
        minWidth: 80,
        flex: 0.5,
      },

      {
        field: "sold",
        headerName: "Sold out",
        type: "number",
        minWidth: 130,
        flex: 0.6,
      },
      {
        field: "Preview",
        flex: 0.8,
        minWidth: 100,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          const d = params.row.name;
          const product_name = d.replace(/\s+/g, "-");
          return (
            <Button onClick={() => handleNavigate(product_name)}>
              <AiOutlineEye size={20} />
            </Button>
          );
        },
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

  shopAllProducts &&
    shopAllProducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
      });
    });

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto ">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default AllShopProducts;