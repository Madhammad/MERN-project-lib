import { useDispatch, useSelector } from "react-redux";
import Logo from "./helperComp/Logo";
import { Link, useNavigate } from "react-router-dom";
import { HiUser, HiViewBoards } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { TbFileLike } from "react-icons/tb";
import { MdAddChart } from "react-icons/md";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonCom from "./helperComp/ButtonCom";
import { signOut } from "../../store/auth/userSlice";
import ReactLoading from "react-loading";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashOverview() {
  const { currentUser, token } = useSelector((state) => state.user);

  const [allProjectLength, setAllProjectLength] = useState(0);
  const [allUserLenghth, setallUserLenght] = useState(0);
  const [allLikedProjectLenghth, setAllLikedProjectLenghth] = useState(0);

  const [loading, setLoading] = useState(false);

  const [showisPublicModal, setShowisPublicModal] = useState(false);

  const [loadingdelete, setLoadingdelete] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const endpoint = currentUser.isAdminRole
          ? "https://mern-project-lib.onrender.com//api/project/allprojects"
          : `https://mern-project-lib.onrender.com//api/project/userallproject/${currentUser._id}`;

        const { data } = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success === false) {
          setLoading(false);
          toast.error(data.error.message || "Failed to fetch projects");
        }
        if (data.success === true) {
          setLoading(false);
          setAllProjectLength(data.data.length);
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching projects."
        );
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [currentUser.isAdminRole, currentUser._id, token]);

  useEffect(() => {
    const allUser = async () => {
      const { data } = await axios.get(
        "https://mern-project-lib.onrender.com//api/auth/allUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        return toast.error(data.message);
      }
      if (data.success === true) {
        setallUserLenght(data.data.length);
      }
    };

    if (currentUser.isAdminRole) allUser();
  }, [currentUser.isAdminRole, token]);

  // all liked projects by users
  useEffect(() => {
    const fetchProjects = async () => {
      const endpoint = currentUser.isAdminRole
        ? "https://mern-project-lib.onrender.com//api/project/allLikedProjects"
        : "https://mern-project-lib.onrender.com//api/project/userLikdedProjects";

      const { data } = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success === false) {
        return toast.error(data.message);
      }
      if (data.success === true) {
        setAllLikedProjectLenghth(data.data.length);
      }
    };

    fetchProjects();
  }, [currentUser.isAdminRole, token]);

  // delete account
  const handleDeleteAccount = async () => {
    setLoadingdelete(true);
    const { data } = await axios.delete(
      `https://mern-project-lib.onrender.com//api/auth/deleteUser/${currentUser._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success === false) {
      setLoadingdelete(true);
      return toast.error(data.message);
    }
    if (data.success === true) {
      setLoadingdelete(true);
      toast.success(data.message);
      dispatch(signOut());
      navigate("/");
    }
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="animate-pulse p-5">
          <div className=" flex">
            <p> Welcome to,</p> <Logo />{" "}
            <ReactLoading
              type={"spinningBubbles"}
              color={"rgb(88 80 236)"}
              height={"2%"}
              width={"3%"}
              delay={100}
            />
          </div>

          <div className="mt-5 flex md:flex-row-reverse flex-col  w-full rounded-3xl bg-slate-300 dark:bg-slate-500 p-3 items-center  justify-between md:h-40 md:gap-20 gap-2">
            <div className=" md:h-36  ">
              <img
                className="rounded-3xl h-full w-full"
                src="https://media.licdn.com/dms/image/v2/D4D12AQGVw0sVZ7Kj-g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673636348357?e=2147483647&v=beta&t=PSpU4mZFpMBmE14oWDnDwf5a8_4rdQUiCUKF_U-x584"
                alt=""
              />
            </div>

            <div className="md:flex-1 w-full">
              <h5 className="mb-2  h-8 rounded-xl w-1/3 bg-slate-600"></h5>
              <p className="mb-5 h-6 rounded-xl w-full bg-slate-600"></p>

              <div className="p-2 text-slate-700 bg-slate-600 rounded-xl w-1/4 h-12"></div>
            </div>
          </div>

          <div className="flex gap-2 md:flex-row flex-col justify-center items-center">
            <div className=" md:w-1/3 w-full p-3 mt-5 bg-slate-300 dark:bg-slate-500 shadow-2xl rounded-3xl">
              <div className="bg-slate-600 h-6 w-1/3 rounded-2xl"></div>
              <p className="bg-slate-600 h-6 w-full rounded-2xl mt-5"></p>
              <div className="p-2  h-6 w-1/3 rounded-xl bg-slate-600  mt-5"></div>
            </div>

            <div className=" md:w-1/3 w-full p-3 mt-5 bg-slate-300 dark:bg-slate-500 shadow-2xl rounded-3xl">
              <div className="bg-slate-600 h-6 w-1/3 rounded-2xl"></div>
              <p className="bg-slate-600 h-6 w-full rounded-2xl mt-5"></p>
              <div className="p-2  h-6 w-1/3 rounded-xl bg-slate-600  mt-5"></div>
            </div>

            <div className=" md:w-1/3 w-full p-3 mt-5 bg-slate-300 dark:bg-slate-500 shadow-2xl rounded-3xl">
              <div className="bg-slate-500 h-6 w-1/3 rounded-2xl"></div>
              <p className="bg-slate-600 h-6 w-full rounded-2xl mt-5"></p>
              <div className="p-2  h-6 w-1/3 rounded-xl bg-slate-600  mt-5"></div>
            </div>
          </div>
          <button className="bg-slate-300 h-10 w-1/4 p-1 rounded-lg dark:bg-slate-500 mx-auto  mt-4">
            <p className="rounded-lg bg-slate-600 h-6 w-1/2 mx-auto"></p>
          </button>
        </div>
      ) : (
        <div className="px-6">
          <div className="text-sm ">
            Welcome to, <Logo />{" "}
            <span className="font-bold">{currentUser.username}!</span>
          </div>

          <div className="mt-5 flex md:flex-row-reverse flex-col  w-full rounded-3xl bg-indigo-500 dark:bg-indigo-950 p-3 items-center  justify-between md:h-40 md:gap-20">
            <div className=" md:h-36  ">
              <img
                className="rounded-3xl h-full w-full"
                src="https://media.licdn.com/dms/image/v2/D4D12AQGVw0sVZ7Kj-g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673636348357?e=2147483647&v=beta&t=PSpU4mZFpMBmE14oWDnDwf5a8_4rdQUiCUKF_U-x584"
                alt=""
              />
            </div>

            <div className="flex-1">
              <h5 className="mb-2 text-base font-bold  text-white">
                Work fast from anywhere
              </h5>
              <p className="mb-5 text-xs  text-white dark:text-gray-300">
                Stay up to date and move work forward with Flowbite on iOS &
                Android. Download the app today.
              </p>

              <Link
                to={"/dashboard?tab=addproject"}
                className="md:p-2 p-1 text-indigo-500 dark:text-indigo-700 bg-slate-100 dark:bg-slate-400 rounded-xl hover:bg-slate-200 text-sm"
              >
                <MdAddChart className="inline-block" /> Add Project
              </Link>

              <Link
                to={"/dashboard?tab=profile"}
                className="p-2 ml-2 rounded-xl  text-sm text-white hover:underline"
              >
                <ImProfile className="inline-block" /> View Profile
              </Link>
            </div>
          </div>

          <div className="flex gap-2 md:flex-row flex-col justify-normal items-center ">
            <div className=" md:w-1/3 w-full p-3 mt-5 dark:bg-slate-600 bg-slate-100 shadow-2xl rounded-3xl">
              <div className="text-xs">
                <HiViewBoards className="inline-block text-indigo-600 dark:text-indigo-100" />{" "}
                Total Project
              </div>
              <p
                className={`mt-5 mb-5 ${
                  allProjectLength === 0
                    ? "text-2xl text-red-500 dark:text-red-400"
                    : "text-7xl"
                }`}
              >
                {allProjectLength !== 0
                  ? allProjectLength
                  : " Not Projects Add"}{" "}
                <span className="text-sm  text-gray-400">Projects</span>
              </p>
              <Link
                to="/dashboard?tab=projects"
                className="p-2  text-xs rounded-xl text-indigo-600 dark:text-indigo-400  hover:underline"
              >
                View All Projects
              </Link>
            </div>

            <div className="md:w-1/3 w-full p-3 mt-5 bg-slate-100 shadow-2xl rounded-3xl dark:bg-slate-600">
              <div className="text-xs">
                <TbFileLike className="inline-block  text-indigo-600 dark:text-indigo-100" />{" "}
                Total Projects Likes
              </div>
              <p
                className={`mt-5 mb-5  ${
                  allLikedProjectLenghth === 0
                    ? "text-2xl text-red-500 dark:text-red-400"
                    : "text-7xl"
                }`}
              >
                {allLikedProjectLenghth !== 0
                  ? allLikedProjectLenghth
                  : "No Projects liked"}{" "}
                <span className="text-sm  text-gray-400">Projects Likes</span>
              </p>
              <Link
                to={
                  currentUser?.isAdminRole
                    ? "/dashboard?tab=totalLikedProjects"
                    : "/dashboard?tab=likeproject"
                }
                className="p-2  text-xs rounded-xl text-indigo-600  hover:underline dark:text-indigo-400"
              >
                View All Like Projects
              </Link>
            </div>

            {currentUser?.isAdminRole && (
              <div className=" md:w-1/3 w-full p-3 mt-5 bg-slate-100 shadow-2xl rounded-3xl dark:bg-slate-600">
                <div className="text-xs">
                  <HiUser className="inline-block text-indigo-600 dark:text-indigo-100" />{" "}
                  Total User
                </div>
                <p className={`mt-5 mb-5 md:text-7xl `}>
                  {allUserLenghth}{" "}
                  <span className="text-sm  text-gray-400">Users</span>
                </p>
                <Link
                  to="/dashboard?tab=users"
                  className="p-2  text-xs rounded-xl text-indigo-600  hover:underline dark:text-indigo-400"
                >
                  View All User
                </Link>
              </div>
            )}
          </div>
          <div
            className="mt-5 w-1/4 text-xs  md:text-lg"
            onClick={() => {
              setShowisPublicModal(true);
            }}
          >
            <ButtonCom text="Delete Account" />
          </div>
        </div>
      )}

      {showisPublicModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 w-96 rounded-lg p-6">
            {/* Modal Header */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowisPublicModal(false)}
                className="text-gray-500 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you Delete Accont
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowisPublicModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loadingdelete && (
        <div className="bg-slate-300 dark:bg-slate-600 bg-opacity-50 absolute h-screen w-[1000px] -top-5 -left-12">
          <div className="h-screen flex items-center   justify-center w-full  ">
            <div className="  text-gray-700 dark:text-gray-300 flex justify-center items-center flex-col rounded-lg dark: gap-5 text-4xl">
              <p className=" pl-0 ">
                <span className="border  border-gray-700 dark:border-gray-300 rounded-lg md:p-1 dark:text-gray-300">
                  Pro<span className="text-indigo-500/100">J</span>ects
                </span>
                Lab
              </p>

              <div className="progress-container ">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
