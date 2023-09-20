import React from "react";
import Sidebar from "../../components/admincomponents/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";

const AdminOrders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allOrders"],
    queryFn: () =>
      newRequest.get(`orders`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : data.length === 0 ? (
        <div className="p-5">
          <div className="text-center text-gray-500 text-2xl font-bold dark:text-white">
            No orders
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full dark:text-white">
          <div className="w-[1400px] h-full flex items-center gap-20 md:p-5 p-2 ">
            <TableContainer
              component={Paper}
              className="dark:bg-black/80 mb-[50px]"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="dark:text-white">Order ID</TableCell>
                    <TableCell className="dark:text-white">Costumer</TableCell>
                    <TableCell className="dark:text-white">Items</TableCell>
                    <TableCell className="dark:text-white">Amount</TableCell>
                    <TableCell className="dark:text-white">Date</TableCell>
                    <TableCell className="dark:text-white">
                      Payment Method
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="dark:text-white">
                        {order._id}
                      </TableCell>
                      <TableCell className="dark:text-white">
                        <div className="flex items-center gap-1">
                          <img
                            className="h-7 w-7 object-cover rounded-full"
                            src={order.buyerImg || "/img/noavatar.jpg"}
                            alt=""
                          />
                          <span>{order.buyerName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-white">
                        {order.carts.map((item) => (
                          <div
                            className="flex items-center gap-1 mb-4"
                            key={item.id}
                          >
                            {item.quantity}
                            <span className="mr-5">X</span>
                            <img
                              className="h-7 w-7 object-cover rounded-full"
                              src={item.img}
                              alt=""
                            />
                            {item.title}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="dark:text-white">
                        ${order.totalAmount}
                      </TableCell>
                      <TableCell className="dark:text-white">
                        {format(order.createdAt)}
                      </TableCell>
                      <TableCell className="dark:text-white">Online</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
