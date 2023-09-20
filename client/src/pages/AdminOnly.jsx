import React from "react";
import { Link } from "react-router-dom";

const AdminOnly = () => {
  return (
    <div className="h-[calc(100vh-250px)] bg-pink-50 w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
      <p className="flex flex-col text-lg mt-2">
        You do not have permission to access this page. Please contact an
        administrator if you believe this is in error.
        <Link to="/" className="text-red-500 underline text-center">
          go back to Homepage
        </Link>
      </p>
    </div>
  );
};

export default AdminOnly;
