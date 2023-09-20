import React, { useReducer, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { INITIAL_STATE, productReducer } from "../../reducer/productReducer";
import { upload } from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";

const AddNewProduct = ({ setOpen }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product) => {
      return newRequest.post("/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mutation.mutateAsync(state);
      setLoading(false);
      setOpen(false);
      toast(res.data, toastOptions);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 m-auto w-full bg-black/70 z-30 flex items-center justify-center dark:text-white">
      <div className="flex flex-col gap-5 bg-orange-300 rounded-lg p-5 fixed mb-[50px] w-[600px]">
        <span
          className="absolute right-0 top-0 px-2 text-xl cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </span>
        <h1 className="text-xl font-semibold text-center mb-10">
          Create Product
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
                placeholder="title"
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
                placeholder="type something"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Latest</label>
              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <label htmlFor="true">True</label>
                  <input
                    type="radio"
                    name="isLatest"
                    id="true"
                    value="true"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-1 items-center">
                  <label htmlFor="false">False</label>
                  <input
                    type="radio"
                    name="isLatest"
                    id="false"
                    value="false"
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                placeholder="0"
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
                placeholder="0"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="images">
                Upload Image
                <span className="text-xs text-red-500 pl-1">
                  (2 image only)
                </span>
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
          className="bg-blue-500 hover:bg-blue-600 rounded-md p-1 text-white text-lg font-medium active:scale-90 duration-100 transition-all flex items-center justify-center"
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size="sm" variant="solid" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddNewProduct;
