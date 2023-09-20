import React, { useState } from "react";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../utils/newRequest";
import { format } from "timeago.js";
import UpdateReview from "./UpdateReview";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const Review = ({ review }) => {
  const [open, setOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/find/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  const handleOpenUpdate = () => {
    if (!currentUser) {
      toast.error("You are not authenticated", toastOptions);
    } else if (review.userId === currentUser._id) {
      setOpen(true);
    } else {
      toast.error("You can update only your review", toastOptions);
    }
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (deleteReview) => {
      return newRequest.delete(`/reviews/${review._id}`, deleteReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["product"]);
    },
  });

  const handleDelete = async () => {
    try {
      const res = await mutation.mutateAsync();
      toast(res.data, toastOptions);
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="flex gap-2">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={data.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div>
            <h1>
              {data.username}
              <span className="text-sm text-gray-400 ml-1">
                {format(review.createdAt)}
              </span>
            </h1>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array(review.star)
                .fill()
                .map((item, i) => (
                  <StarIcon fontSize="inherit" key={i} />
                ))}
              <span className="text-sm font-bold mt-0.5">{review.star}</span>
            </div>
            {open ? (
              <UpdateReview review={review} setOpen={setOpen} />
            ) : (
              <p className="text-sm my-2 text-justify">{review.desc}</p>
            )}

            <div className="text-sm text-gray-400 flex gap-3">
              <div className="flex items-center gap-1">
                <ThumbUpIcon fontSize="inherit" />
                <span>Helpful?</span>
              </div>
              {open ? (
                <button onClick={handleCloseUpdate}>Cancel</button>
              ) : (
                <button onClick={handleOpenUpdate}>Update</button>
              )}

              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
