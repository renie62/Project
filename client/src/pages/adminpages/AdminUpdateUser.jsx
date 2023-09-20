import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import CircularProgress from "@mui/joy/CircularProgress";
import { newRequest } from "../../utils/newRequest";
import { upload } from "../../utils/upload";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admincomponents/Sidebar";
import UpdateAdmin from "../../components/admincomponents/UpdateAdmin";

const AdminUpdateUser = ({ setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    img: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/find/${id}`).then((res) => {
        return res.data;
      }),
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = await upload(avatar);
      const { username, password, confirmPassword } = user;
      const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
      const userRegExp = /^[a-zA-Z0-9]{6,}$/;
      if (userRegExp.test(username)) {
        if (regExp.test(password)) {
          if (password === confirmPassword) {
            const res = await newRequest.put(`/users/${id}`, {
              ...user,
              img: url,
            });
            setLoading(false);
            toast("User has been updated", toastOptions);
            navigate("/admin/users");
          } else {
            setLoading(false);
            toast.error(
              "password and confirm password not equal",
              toastOptions
            );
          }
        } else {
          setLoading(false);
          toast.error(
            "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number.",
            toastOptions
          );
        }
      } else {
        setLoading(false);
        toast.error(
          "Your username must be at least 6 characters long.",
          toastOptions
        );
      }
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
        <div className="h-[calc(100vh-90px)] w-full flex items-center lg:justify-center lg:flex-row flex-col lg:gap-[300px] gap-[50px] p-5 mt-[20px] lg:mt-0">
          <UpdateAdmin userName={data.username} userId={id} />
          <div className="flex flex-col gap-5 bg-orange-300 rounded-lg p-5">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold text-center mb-5">
                Update User
              </h1>
              <div className="flex flex-col">
                <label className="text-lg font-medium" htmlFor="email">
                  Username
                </label>
                <input
                  className="pl-1 py-1 rounded-md dark:text-black"
                  type="text"
                  name="username"
                  id="username"
                  placeholder={data?.username}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="pl-1 py-1 rounded-md dark:text-black"
                  type="email"
                  name="email"
                  id="email"
                  placeholder={data?.email}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium" htmlFor="password">
                  Password
                </label>
                <div className="bg-white rounded-md pr-1 flex items-center justify-between">
                  <input
                    className="pl-1 py-1 rounded-md dark:text-black"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="********"
                    required
                    onChange={handleChange}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="text-lg font-medium"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="bg-white rounded-md pr-1 flex items-center justify-between">
                  <input
                    className="pl-1 py-1 rounded-md dark:text-black"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    required
                    onChange={handleChange}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium" htmlFor="file">
                  Profile Pic
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : data.img || "/img/login-animation.gif"
                    }
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-full cursor-pointer active:scale-90 duration-100 transition-all"
                  />
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="file"
                  accept="images/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size="sm" variant="solid" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdateUser;
