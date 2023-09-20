import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../utils/newRequest";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import CircularProgress from "@mui/joy/CircularProgress";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(true);
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      if (res.data?.isAdmin) {
        navigate("/admin");
        toast(`Welcome Admin ${res.data.username}!`, toastOptions);
      } else {
        navigate("/");
        toast(`Welcome ${res.data.username}!`, toastOptions);
      }
    } catch (error) {
      dispatch(loginFailure());
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  const signinWithGoogle = () => {
    dispatch(loginStart());
    setGoogleLoading(true);
    signInWithPopup(auth, provider).then(async (result) => {
      await newRequest
        .post("/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          setGoogleLoading(false);
          toast(`Welcome ${res.data.username}!`, toastOptions);
          navigate("/");
        })
        .catch((error) => {
          dispatch(loginFailure());
          setGoogleLoading(false);
          toast.error(error.response.data, toastOptions);
        });
    });
  };

  return (
    <div className="h-[calc(100vh-270px)] w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
      <div className="bg-orange-300 rounded-lg p-5 flex flex-col">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-center mb-5">Login</h1>
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
              onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="cursor-pointer dark:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
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
        <h1 className="text-xl font-semibold text-center my-1">Or</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
          onClick={signinWithGoogle}
        >
          {googleLoading ? (
            <CircularProgress size="sm" variant="solid" />
          ) : (
            "Signin With Google"
          )}
        </button>
        <Link to="/register" className="text-sm text-red-500 underline mt-2">
          Go to Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
