import React, { useReducer, useState } from "react";
import Sidebar from "../../components/admincomponents/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { INITIAL_STATE, productReducer } from "../../reducer/productReducer";
import { upload } from "../../utils/upload";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import CircularProgress from "@mui/joy/CircularProgress";
import UpdateLatestProduct from "../../components/admincomponents/UpdateLatestProduct";

const AdminUpdateProduct = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest.get(`/products/find/${id}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedProduct) => {
      return newRequest.put(`/products/${id}`, updatedProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const [state, dispatch] = useReducer(productReducer, {
    ...INITIAL_STATE,
    ...data,
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({
        type: "ADD_IMAGES",
        payload: { images },
      });
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mutation.mutateAsync(state);
      setLoading(false);
      toast(res.data, toastOptions);
      navigate("/admin/products");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="h-[calc(100vh-90px)] w-full flex items-center justify-center lg:flex-row flex-col lg:gap-[300px] gap-[50px] p-5 mt-[20px] lg:mt-0">
          <UpdateLatestProduct title={data.title} productId={id} />
          <div className="bg-orange-300 rounded-lg p-5 flex flex-col w-[600px]">
            <h1 className="text-xl font-semibold text-center mb-10">
              Update Product
            </h1>
            <div className="flex gap-5">
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md dark:text-black"
                    type="text"
                    name="title"
                    id="title"
                    value={state.title}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="category">
                    Category
                  </label>
                  <select
                    className="pl-1 py-1 rounded-md dark:text-black"
                    name="category"
                    id="category"
                    value={state.category}
                    required
                    onChange={handleChange}
                  >
                    <option value="">--Please choose category--</option>
                    <option value="Milk Tea">Milk Tea</option>
                    <option value="Bubble Tea">Bubble Tea</option>
                    <option value="Fruit Tea">Fruit Tea</option>
                    <option value="Apple Tea">Apple Tea</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="desc">
                    Description
                  </label>
                  <textarea
                    className="pl-1 py-1 rounded-md dark:text-black"
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="5"
                    value={state.desc}
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="oldPrice">
                    Old Price
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md dark:text-black"
                    type="number"
                    name="oldPrice"
                    id="oldPrice"
                    value={state.oldPrice}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md dark:text-black"
                    type="number"
                    name="price"
                    id="price"
                    value={state.price}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="images">
                    Upload Image
                  </label>
                  <input
                    className="my-2"
                    type="file"
                    id="images"
                    accept="images/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 rounded-md p-1 text-white text-lg font-medium active:scale-90 duration-100 transition-all"
                    onClick={handleUpload}
                  >
                    {uploading ? "Uploading" : "Upload"}
                  </button>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 rounded-md p-1 text-white text-lg font-medium active:scale-90 duration-100 transition-all mt-5 flex items-center justify-center"
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size="sm" variant="solid" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdateProduct;
