import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../utils/newRequest";
import { upload } from "../utils/upload";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import CircularProgress from "@mui/joy/CircularProgress";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    img: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());
    try {
      const url = await upload(avatar);
      const { username, password, confirmPassword } = user;
      const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
      const userRegExp = /^[a-zA-Z0-9]{6,}$/;
      if (userRegExp.test(username)) {
        if (regExp.test(password)) {
          if (password === confirmPassword) {
            const res = await newRequest.post("/auth/register", {
              ...user,
              img: url,
            });
            dispatch(loginSuccess(res.data));
            setLoading(false);
            toast(`Welcome ${res.data.username}!`, toastOptions);
            navigate("/");
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
      dispatch(loginFailure());
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="h-[calc(100vh-270px)] w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
      <div className="bg-orange-300 rounded-lg p-5 flex flex-col">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-center mb-5">Register</h1>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="email">
              Username
            </label>
            <input
              className="pl-1 py-1 rounded-md dark:text-black"
              type="text"
              name="username"
              id="username"
              placeholder="username"
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
              placeholder="email"
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
                className="cursor-pointer dark:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="confirmPassword">
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
                className="cursor-pointer dark:text-black"
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
              {avatar ? (
                <img
                  className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                  src={URL.createObjectURL(avatar)}
                  alt=""
                />
              ) : (
                <img
                  className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                  src="/img/login-animation.gif"
                  alt=""
                />
              )}
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
        <Link to="/login" className="text-sm text-red-500 underline mt-2">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
