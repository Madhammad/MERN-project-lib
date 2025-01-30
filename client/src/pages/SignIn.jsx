import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signIn } from "../../store/auth/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Logo from "./../componunt/helperComp/Logo";

import ButtonCom from "../componunt/helperComp/ButtonCom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await axios.post("http://localhost:3000/api/auth/signIn", {
      email,
      password,
    });

    if (!response.data.success) {
      setLoading(false);
      return toast.error(response.data.message || "error in Sign In");
    }

    if (response.data.success === true) {
      setLoading(false);
      toast.success("Successfully Login");

      const { user, token } = response.data.data;

      dispatch(signIn({ user, token }));

      navigate("/");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center md:px-32 px-10 ">
      {loading ? (
        <>
          <div className="min-h-80 flex items-center justify-center w-full  ">
            <div className="  text-gray-400 flex justify-center items-center flex-col rounded-lg gap-5 text-4xl">
              <p to={"/"} className=" pl-0 ">
                <span className="border  border-gray-400 rounded-lg md:p-1 hover:text-indigo-500/100 ">
                  Pro<span className="text-indigo-500/100">J</span>ects
                </span>
                Lab
              </p>

              <div className="progress-container ">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <motion.div
          className="flex flex-col md:flex-row-reverse gap-10 items-center"
          animate={{
            x: [-100, 0], // Start from right and move to the left
          }}
          transition={{
            duration: 0.5, // Duration of one cycle
            ease: "linear", // Smooth and continuous motion
          }}
        >
          <motion.div
            animate={{
              x: [-100, 0], // Start from right and move to the left
            }}
            transition={{
              duration: 0.5, // Duration of one cycle
              ease: "linear", // Smooth and continuous motion
            }}
            className="text-center lg:text-left flex-1"
          >
            <h6 className="text-2xl font-bold md:mb-10 mb-5">
              Reconnect with Your Creativity with <Logo />!
            </h6>
            <p className="text-sm md:text-base">
              "Welcome back to <Logo />! Access your portfolio, upload new
              projects, and engage with a thriving developer community. Let’s
              keep your innovation moving—
              <span className="text-indigo-500/100">sign in</span> below and
              dive back in!"
            </p>
          </motion.div>

          <div className="w-full max-w-sm  flex-1 shadow-2xl p-5 rounded-xl">
            <form
              className="card-body flex flex-col gap-4 p-6 max-w-sm mx-auto bg-white dark:bg-blue-950 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <h6 className="text-center text-3xl font-semibold mb-5">
                Si<span className="text-indigo-500">g</span>n In
              </h6>

              <input
                id="email4"
                type="email"
                placeholder="name@projectLib.com"
                className="dark:bg-blue-950 mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                id="password4"
                type="password"
                placeholder="*********"
                required
                className="dark:bg-blue-950 mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-indigo-500 text-white  rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <ButtonCom text={"Sign In"} />
              </button>

              <p className="text-xs mt-4 text-center">
                Don't have an account?{" "}
                <Link
                  className="text-indigo-500 hover:text-indigo-400 hover:underline font-bold"
                  to={"/signUp"}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
