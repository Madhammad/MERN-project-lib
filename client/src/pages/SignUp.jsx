import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import toast from "react-hot-toast";
import Logo from "./../componunt/helperComp/Logo";
import ButtonCom from "../componunt/helperComp/ButtonCom";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data } = await axios.post(
      "https://mern-project-lib.onrender.com/api/auth/signup",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    // console.log(res.data, "data");

    if (data.success === false) {
      setLoading(false);
      return toast.error(data.error);
    }
    if (data.success === true) {
      setLoading(false);
      toast.success("Successfully Register");
      navigate("/signIn");
    }
  };

  return (
    <div className=" min-h-screen  flex items-center justify-center md:px-32 px-10">
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
        <div className="flex flex-col lg:flex-row-reverse md:gap-10 items-center">
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
            <h6 className="md:text-2xl text-sm font-bold md:mb-10 mb-5">
              Unleash Your Creativity with <Logo />
            </h6>
            <p className="md:py-6 text-xs md:text-base">
              <span className="text-indigo-500/100 font-bold ">Sign up</span>{" "}
              and bring your ideas to life! <Logo /> offers you a seamless way
              to save, showcase, and share your projects with a community of
              developers. Whether you're training or building your portfolio,
              this is the place to grow and connect. Register below and start
              sharing your story today!
            </p>
          </motion.div>

          <motion.div
            animate={{
              x: [-100, 0], // Start from right and move to the left
            }}
            transition={{
              duration: 0.5, // Duration of one cycle
              ease: "linear", // Smooth and continuous motion
            }}
            className="w-full max-w-sm  flex-1 shadow-2xl p-5 rounded-xl"
          >
            <form
              className="card-body flex flex-col gap-4 p-6 max-w-sm mx-auto bg-white dark:bg-blue-950 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <h6 className="text-center text-3xl font-semibold mb-5">
                Si<span className="text-indigo-500">g</span>n Up
              </h6>

              <input
                id="username"
                type="text"
                placeholder="Username"
                className="dark:bg-blue-950 mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                id="email4"
                type="email"
                placeholder="name@flowbite.com"
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
                <ButtonCom text={"Sign Up"} />
              </button>

              <p className="text-xs mt-4 text-center">
                Already have an account?{" "}
                <Link
                  className="text-indigo-500 hover:text-indigo-400 hover:underline font-bold"
                  to={"/signIn"}
                >
                  Sign In
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
