import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GrLike } from "react-icons/gr";
import { ProfilePersent } from "../componunt/helperComp/ProfilePersent";

export function Projects() {
  const { currentUser, token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const myArray = new Array(6).fill(null);
  
  
  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://mern-project-lib.onrender.com//api/project/getallproject",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

     

      if (data.success === false) {
        setLoading(false);
        return toast.error(data.error);
      }
      if (data.success === true) {
        setLoading(false);
        setProjects(data.data);
      }
    };

    fetchProjects();
  }, [setLoading, token]);

  return (
    <div className="p-5">
      {loading ? (
        <div className="animate-pulse">
          <div className="bg-slate-300 dark:bg-slate-600 w-full h-48 rounded-lg flex md:px-20 md:py-5 text-gray-300 items-center md:gap-10 ">
            <h1 className="md:text-4xl font-bold basis-[40%] bg-slate-700 text-slate-700 rounded-lg h-full">
              Projects for Web Developers for learners & Students
            </h1>
            <p className="basis-[60%] bg-slate-700 text-slate-700 h-full rounded-lg ">
              Get projects for pretice form all over the world which hence your
              web skills. You're honing your skills in JavaScript, React, or
              full-stack MERN development, and connect with a community of
              like-minded tech enthusiasts.
            </p>
          </div>

          <div className="">
            <div className="flex justify-center items-center gap-2 p-5">
              <div className="w-10 h-10 rounded-full bg-slate-700"></div>

              <button className="bg-slate-600 w-20 h-10 rounded-xl"></button>
            </div>
          </div>

          <div className="flex p-5 gap-5 flex-wrap justify-center  mt-2">
            {myArray.map((ind) => (
              <>
                <div
                  className="group relative w-full md:w-1/2  overflow-hidden rounded-lg  transition-all bg-slate-300 dark:bg-slate-600 p-3"
                  key={ind}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700"></div>

                    <div className="ml-3 w-1/4 h-10 bg-slate-700 rounded-2xl"></div>
                  </div>

                  <p className="w-full h-10 bg-slate-700 mb-1 rounded-2xl "></p>
                  <div className="w-full h-60 bg-slate-700 rounded-2xl"></div>

                  <div className="p-3 flex flex-col gap-1 rounded-2xl">
                    <p className="w-1/4 h-10 bg-slate-700 rounded-2xl"></p>
                    <span className="w-1/4 h-10 bg-slate-700 rounded-2xl"></span>
                    <span className="w-1/4 h-10 bg-slate-700 rounded-2xl"></span>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="bg-slate-200 h-8 w-1/3   p-1 rounded-lg"></button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-indigo-500 w-full h-48 rounded-lg flex md:px-20 md:py-5 text-gray-300 items-center md:gap-10 p-2 gap-2">
            <h1 className="md:text-4xl text-lg font-bold basis-[40%]">
              Projects for Web Developers for learners & Students
            </h1>
            <p className="basis-[60%] md:text-xl text-sm">
              Get projects for pretice form all over the world which hence your
              web skills. You're honing your skills in JavaScript, React, or
              full-stack MERN development, and connect with a community of
              like-minded tech enthusiasts.
            </p>
          </div>
          {currentUser ? (
            <div className="">
              <div className="flex justify-center items-center gap-2 p-5 ">
                <img
                  src={currentUser?.profileImage?.secure_url}
                  alt={`${currentUser?.usernam}'s profile`}
                  className="w-10 h-10 rounded-full"
                />

                <button className="bg-indigo-500 p-2 rounded-lg text-white">
                  <Link to={"/dashboard?tab=addproject"}>Add Projects</Link>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 p-5">
              <button className="bg-indigo-500 p-2 rounded-lg text-white">
                <Link to={"/signIn"}>Sign In</Link>
              </button>
            </div>
          )}
          <div className="flex justify-center  gap-2 md:px-20 p-1">
            {currentUser && (
              <div className="md:block hidden">
                <ProfilePersent />
              </div>
            )}
            <div className="rounded-lg w-full flex gap-2 flex-col">
              {projects.map((proj) => (
                <>
                  <div
                    className="group relative md:w-full w-full   transition-all bg-white dark:bg-slate-600 shadow-lg rounded-lg p-3"
                    key={proj._id}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={proj.createdBy.profileImage.secure_url}
                        alt={`${proj.createdBy.usernam}'s profile`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3 dark:text-gray-300">
                        <h3 className="text-sm font-semibold hover:underline cursor-pointer ">
                          <Link to={`/user/${proj.createdBy._id}`}>
                            {proj.createdBy.username}
                          </Link>
                        </h3>
                        <h6 className="text-xs">{proj.createdBy?.headline}</h6>
                      </div>
                    </div>

                    <p className="text-gray-800 dark:text-slate-200 mb-4">
                      {proj.description}
                    </p>
                    <img
                      src={proj.projectImage.secure_url}
                      alt="post cover"
                      className="w-full h-60 object-cover rounded-md mb-4"
                    />

                    <div className="p-3 flex flex-col gap-1">
                      <p className="text-lg font-semibold ">{proj.title}</p>
                      <span className="italic text-sm text-gray-600">
                        {proj.category}
                      </span>
                      <span className="italic text-sm">
                        {proj.description.split(" ").slice(0, 5).join(" ") +
                          ".."}
                      </span>
                      <p className="italic text-sm border-t  border-gray-300 dark:border-slate-300 py-2">
                        <GrLike className="inline-block" /> :{" "}
                        {proj?.totalLikes?.length}
                      </p>
                      <Link
                        to={`/project/${proj._id}`}
                        className="z-10  absolute bottom-0  right-0 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-center md:py-2 rounded-md !rounded-tl-none m-2 w-1/4  text-xs"
                      >
                        View Project Details
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
