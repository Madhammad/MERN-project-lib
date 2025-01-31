import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineCastForEducation } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { About } from "./../pages/About";

export default function DashProfile() {
  const { currentUser, token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com/api/project/userallproject/${currentUser._id}?limit=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
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
  }, [token]);

  const calculateProfileCompletion = () => {
    let completion = 0;

    if (currentUser.username && currentUser.email) completion += 30;
    if (currentUser.profileImage) completion += 20;
    if (currentUser.headline) completion += 20;
    if (currentUser.bio) completion += 15;
    if (currentUser.skills && currentUser.skills.length > 0) completion += 15;

    return completion;
  };

  const completion = calculateProfileCompletion();

  return (
    <>
      <div className=" md:w-10/12 relative md:px-1 px-5">
        {loading ? (
          <div className="animate-pulse">
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
          <div className="md:p-0 p-5">
            <div className="  rounded-xl bg-indigo-300  dark:bg-indigo-950 p-2 ">
              <div className="flex flex-col md:flex-row   ">
                <div className="   md:basis-[20%]  h-44  md:border-r-2 border-gray-300 dark:border-gray-600 p-2 ">
                  <img
                    src={currentUser?.profileImage.secure_url}
                    alt=""
                    className=" w-full h-full rounded-full object-fill"
                  />
                </div>

                <div className="flex-1 basis-[75%] flex flex-col gap-5 md:p-2 p-1 text-xs md:text-sm text-slate-500 dark:text-white">
                  <div className="flex gap-4 items-center">
                    <FaUser className="" />
                    <p className=" text-sm">{currentUser?.username}</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <MdEmail />
                    <p className=" text-sm">{currentUser?.email}</p>
                  </div>

                  <div className="flex gap-4 items-center border-b-2 border-gray-300 dark:border-gray-600 pb-2 text-slate-500 dark:text-white">
                    <MdOutlineCastForEducation className="" />
                    <p
                      className={
                        currentUser?.headline
                          ? "text-slate-700 dark:text-white text-sm"
                          : "text-red-800 dark:text-red-400 text-sm"
                      }
                    >
                      {" "}
                      {currentUser?.headline
                        ? currentUser.headline
                        : "Update your profile and enter Headline"}
                    </p>
                  </div>
                  <div className="">
                    <div className="mb-3">
                      <div className="relative w-full h-3 bg-gray-300 rounded-full">
                        <div
                          className="absolute h-3 rounded-full bg-indigo-500"
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-white text-center">
                        {completion === 100
                          ? "Profile Completed"
                          : `${completion}% completed Update Profile`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to={"/dashboard?tab=updateProfile"}>
              <CiEdit className="rounded-full bg-indigo-400 p-1 text-xl hover:scale-150 text-white absolute md:top-1 md:right-4 right-12 top-[200px]" />
            </Link>
            <Link to={"/dashboard?tab=updateProfileImage"}>
              <CiEdit className="text-white font-bold absolute md:top-1 md:left-36 right-12 top-10 rounded-full bg-indigo-400 p-1 text-xl hover:scale-150" />
            </Link>

            <div className="bg-slate-50 dark:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded-xl mt-5 p-2">
              <p className="border-b border-gray-300 p-1  mb-4 text-slate-700 dark:text-slate-200 md:text-3xl ">
                Bio:
              </p>

              <p
                className={
                  currentUser?.bio
                    ? "text-slate-700 dark:text-slate-200 text-sm"
                    : "text-red-400 text-sm"
                }
              >
                {currentUser?.bio
                  ? currentUser.bio
                  : "Update your profile and enter Headline"}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-600 border border-gray-300 dark:border-gray-600  rounded-xl mt-5 p-2">
              <h6 className="border-b border-gray-300 p-1  mb-4 text-slate-700 md:text-3xl dark:text-slate-200">
                Skills
              </h6>

              <div className="flex gap-3">
                {currentUser?.skills?.length ? (
                  currentUser.skills.map((tag) => (
                    <div
                      className="border border-gray-300 p-2 md:text-sm text-xs rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 "
                      key={tag._id}
                    >
                      {tag.toUpperCase()}
                    </div>
                  ))
                ) : (
                  <p className="text-red-400 text-sm">
                    Update profile and add your Skills
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-50  dark:bg-slate-600 border border-gray-300 dark:border-gray-600  rounded-xl mt-5 p-2">
              <h6 className="border-b border-gray-300 p-1  mb-4 text-slate-700 dark:text-slate-200 md:text-3xl">
                Projects
              </h6>

              <div className="flex gap-3 flex-col">
                {projects?.length ? (
                  projects?.map((proj) => (
                    <div
                      className="border border-gray-300 p-2 text-sl rounded-lg text-slate-700 relative"
                      key={proj._id}
                    >
                      <div className="flex h-20 text-slate-400">
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
                  <p className="text-red-400 text-sm p-2">
                    Add your projects to Showcaise and help new developers.
                  </p>
                )}
              </div>

              <Link to={"/projects"} className="text-center">
                <p className="p-2 text-slate-500 hover:bg-slate-300 hover:underline rounded-xl mt-2">
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
