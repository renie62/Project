import React, { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import { toastOptions } from "../../utils/toastOptions";

const UpdateLatestProduct = ({ title, productId }) => {
  const [loading, setLoading] = useState(false);
  const [isLatestValue, setIsLatestValue] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (isLatest) => {
      return newRequest.put(`/products/status/${productId}`, isLatest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mutation.mutateAsync({ isLatest: isLatestValue });
      setLoading(false);
      toast(res.data, toastOptions);
      navigate("/admin/products");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  const handleRadioChange = (e) => {
    setIsLatestValue(e.target.value === "true");
  };

  return (
    <div className="bg-orange-300 rounded-lg p-5">
      <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
        <h1 className="text-xl font-semibold text-center">
          Update Latest Product
        </h1>
        <div className="flex flex-col">
          <div className="mb-2">
            <label className="text-lg">{title}</label>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <label htmlFor="false">False</label>
              <input
                id="false"
                type="radio"
                name="isLatest"
                value="false"
                checked={!isLatestValue}
                onChange={handleRadioChange}
              />
            </div>
            <div className="flex gap-1">
              <label htmlFor="true">True</label>
              <input
                id="true"
                type="radio"
                name="isLatest"
                value="true"
                checked={isLatestValue}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
          type="submit"
        >
          {loading ? <CircularProgress size="sm" variant="solid" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLatestProduct;
