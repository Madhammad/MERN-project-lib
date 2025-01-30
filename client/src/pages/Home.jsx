import { Link } from "react-router-dom";
import { SlidingText } from "../componunt/SlidingText";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import Logo from "./../componunt/helperComp/Logo";
import ButtonCom from "./../componunt/helperComp/ButtonCom";

export default function Home() {
  
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" min-h-screen md:px-20 px-10 relative dark:bg-slate-700 bg-white">
      <div className="overflow-hidden">
        <div className="h-48 mt-5">
          <div className="flex h-full items-center justify-center overflow-hidden ">
            <img
              className="w-full h-full object-fill "
              src="https://static.wixstatic.com/media/80044a_5d9f51f2e0e34a4496c3e48344c3327f~mv2.png/v1/fill/w_608,h_262,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/80044a_5d9f51f2e0e34a4496c3e48344c3327f~mv2.png" 
            />
          </div>
        </div>

        <motion.div
          animate={{
            x: [-100, 0], // Start from right and move to the left
          }}
          transition={{
            duration: 0.5, // Duration of one cycle
            ease: "linear", // Smooth and continuous motion
          }}
          className="mt-5"
        >
          <h6 className="text-lg md:text-xl font-bold">
            {currentUser !== null ? (
              <div>
                Welcome!{" "}
                <motion.p
                  className="text-indigo-500/100 inline-block bg"
                  animate={{
                    x: ["0%", "10%"],
                  }}
                  transition={{
                    repeat: Infinity, // Infinite loop
                    duration: 1, // Duration of one cycle
                    ease: "linear", // Smooth and continuous motion
                  }}
                >
                  {currentUser.username}
                </motion.p>
              </div>
            ) : (
              <Logo />
            )}
            <span className="text-white w-full md:w-1/2">
              {/* For Learning, Sharing, and Showcasing Projects */}
              <SlidingText />
            </span>
          </h6>
          <p className="py-6 ">
            From Practice to Portfolio: Share Your Creations Showcase Your Work,
            Collaborate, and Learn! 🚀 Our platform is designed for developers
            and learners to upload, save, and share their projects with ease.
            Whether you're honing your skills in JavaScript, React, or
            full-stack MERN development, this is your space to store progress,
            share innovations, and connect with a community of like-minded tech
            enthusiasts. Start building, sharing, and growing your portfolio
            today!.
          </p>
          <div className="">
            <Link to={currentUser ? "/projects" : "/signUp"} className="mb-10">
              <ButtonCom text={"Get Projects"} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
