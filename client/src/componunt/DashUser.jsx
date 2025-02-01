import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineCastForEducation } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import DashSidebar from "./DashSidebar";

import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function DashUser() {
  const { userId } = useParams();
  const [user, setUsers] = useState({});

  const { token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com//api/project/userallproject/${userId}?limit=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success === false) {
        return toast.error(data.error);
      }
      if (data.success === true) {
        setProjects(data.data);
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com//api/auth/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.success === true) {
        setLoading(false);
        setUsers(data.data);
      }
    };

    getUser();
  }, [userId, token]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row ">
        <div className="md:w-60">
          <DashSidebar />
        </div>

        {loading ? (
          <div className="animate-pulse md:p-3 p-5 basis-[70%]">
            <div className="  rounded-xl bg-slate-300 dark:bg-slate-500 p-2">
              <div className="flex flex-col md:flex-row   ">
                <div className="flex-1  md:basis-[15%]    bg-slate-600 rounded-full"></div>

                <div className="flex-1 basis-[75%] flex flex-col gap-5 md:p-2 p-1 text-xs md:text-sm ">
                  <div className="flex gap-4 items-center">
                    <FaUser className="text-slate-600" />
                    <p className=" bg-slate-600 w-1/4 h-4 rounded-lg"></p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <MdEmail className="text-slate-600" />
                    <p className="text-slate-700 bg-slate-600 rounded-lg text-sm w-1/4 h-4"></p>
                  </div>

                  <div className="flex gap-4 items-center border-b-2 border-gray-400 pb-2">
                    <MdOutlineCastForEducation className="text-slate-600" />
                    <p className="bg-slate-600 w-1/4 h-4 rounded-lg"></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-300 dark:bg-slate-500  rounded-xl mt-5 p-2">
              <p className="bg-slate-600 w-1/4 h-10 rounded-lg mb-3 "></p>

              <p className="bg-slate-600 w-full h-10 rounded-lg"></p>
            </div>

            <div className="bg-slate-300 dark:bg-slate-500  rounded-xl mt-5 p-2">
              <p className="bg-slate-600 w-1/4 h-10 rounded-lg mb-3 "></p>

              <p className="bg-slate-600 w-full h-10 rounded-lg"></p>
            </div>

            <div className="bg-slate-300  dark:bg-slate-500  rounded-xl mt-5 p-2">
              <p className="bg-slate-600 w-1/4 h-10 rounded-lg mb-3 "></p>

              <p className="bg-slate-600 w-full h-10 rounded-lg"></p>
            </div>
          </div>
        ) : (
          <div className="md:p-3 p-5 basis-[70%]">
            <div className=" ounded-xl bg-indigo-300  dark:bg-indigo-950 p-2 ">
              <div className="flex flex-col md:flex-row   ">
                <div className="d:basis-[20%]  h-44  md:border-r-2 border-gray-300 dark:border-gray-600 p-2 ">
                  <img
                    src={user?.profileImage?.secure_url}
                    alt=""
                    className=" w-full h-full rounded-full object-fill"
                  />
                </div>

                <div className="flex-1 basis-[75%] flex flex-col gap-5 md:p-2 p-1 text-xs md:text-sm  text-slate-500 dark:text-white ">
                  <div className="flex gap-4 items-center">
                    <FaUser />
                    <p>{user?.username}</p>
                  </div>

                  <div className="flex gap-4 items-center  text-slate-500 dark:text-white">
                    <MdEmail />
                    <p>{user?.email}</p>
                  </div>

                  <div className="flex gap-4 items-center border-b-2 border-gray-300 dark:border-gray-600 text-slate-500 dark:text-white pb-2">
                    <MdOutlineCastForEducation />
                    <p
                      className={
                        user?.headline
                          ? "text-slate-500  dark:text-white text-sm"
                          : "text-red-800 dark:text-red-400 text-sm"
                      }
                    >
                      {" "}
                      {user?.headline
                        ? user.headline
                        : "No Headline Added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded-xl mt-5 p-2">
              <p className="border-b border-gray-300 p-1  mb-4 text-slate-700 dark:text-slate-200 md:text-3xl ">
                Bio:
              </p>

              <p
                className={
                  user?.headline
                    ? "text-slate-700 text-sm dark:text-slate-200"
                    : "text-red-800 dark:text-red-400 text-sm"
                }
              >
                {user?.bio
                  ? user.bio
                  : "no bio added"}

              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded-xl mt-5 p-2">
              <h6 className="border-b border-gray-300 p-1  mb-4 text-slate-700 dark:text-slate-200 md:text-3xl">
                Skills
              </h6>

              <div className="flex gap-3">
                {user?.skills?.length ? (
                  user.skills.map((tag) => (
                    <div
                      className="border border-gray-300 p-2 text-sm rounded-lg text-slate-700 dark:text-slate-200"
                      key={tag._id}
                    >
                      {tag.toUpperCase()}
                    </div>
                  ))
                ) : (
                  <p className="dark:text-red-400 text-red-800 text-sm">
                    No Skills Added
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded-xl mt-5 p-2">
              <h6 className="border-b border-gray-300 dark:border-gray-500 p-1  mb-4 text-slate-700  dark:text-slate-200 md:text-3xl">
                Projects
              </h6>

              <div className="flex gap-3 flex-col">
                {projects?.length ? (
                  projects?.map((proj) => (
                    <div
                      className="border border-gray-300 dark:border-gray-500 p-2 text-sl rounded-lg text-slate-700 dark:text-slate-300 relative"
                      key={proj._id}
                    >
                      <div className="flex h-20 text-slate-400 dark:text-slate-300">
                        <div className="basis-40 h-full overflow-hidden">
                          <img
                            src={proj.projectImage.secure_url}
                            alt=""
                            className="h-full w-full object-cover rounded-2xl "
                          />
                        </div>
                        <div className=" basis-full p-1">
                          <p className="font-bold md:text-base text-[8px] ">
                            {proj.title}
                          </p>
                          <p className="md:text-sm text-[6px]">
                            {proj.description
                              .split(" ")
                              .slice(0, 20)
                              .join(" ") + ".."}{" "}
                          </p>
                        </div>
                      </div>
                      <p className="absolute top-16 right-8 text-indigo-400 md:text-base text-[6px]">
                        <Link
                          to={`/project/${proj._id}`}
                          className="hover:underline"
                        >
                          See More...
                        </Link>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-red-800 dark:text-red-400 text-sm p-2">
                    Add your projects to Showcaise and help new developers.
                  </p>
                )}
              </div>

              <Link to={`/userProjects/${userId}`} className="text-center">
                <p className="p-2 text-slate-500 hover:bg-slate-300 hover:underline rounded-xl">
                  Show All Projects
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
