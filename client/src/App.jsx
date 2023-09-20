import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Admin from "./pages/adminpages/Admin";
import AdminOnly from "./pages/AdminOnly";
import { useSelector } from "react-redux";
import AdminProducts from "./pages/adminpages/AdminProducts";
import AdminUsers from "./pages/adminpages/AdminUsers";
import AdminOrders from "./pages/adminpages/AdminOrders";
import AdminUpdateUser from "./pages/adminpages/AdminUpdateUser";
import AdminUpdateProduct from "./pages/adminpages/AdminUpdateProduct";
import UpdateUser from "./pages/UpdateUser";

function App() {
  const queryClient = new QueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="update/:id" element={<UpdateUser />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="orders" element={<Orders />} />
              <Route path="admin">
                <Route
                  index
                  element={currentUser?.isAdmin ? <Admin /> : <AdminOnly />}
                />
                <Route
                  path="users"
                  element={
                    currentUser?.isAdmin ? <AdminUsers /> : <AdminOnly />
                  }
                />
                <Route
                  path="user/:id"
                  element={
                    currentUser?.isAdmin ? <AdminUpdateUser /> : <AdminOnly />
                  }
                />
                <Route
                  path="products"
                  element={
                    currentUser?.isAdmin ? <AdminProducts /> : <AdminOnly />
                  }
                />
                <Route
                  path="product/:id"
                  element={
                    currentUser?.isAdmin ? (
                      <AdminUpdateProduct />
                    ) : (
                      <AdminOnly />
                    )
                  }
                />
                <Route
                  path="orders"
                  element={
                    currentUser?.isAdmin ? <AdminOrders /> : <AdminOnly />
                  }
                />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </QueryClientProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
