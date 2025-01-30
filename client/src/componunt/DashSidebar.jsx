import { Link, useLocation } from "react-router-dom";

import { HiChartPie, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { TbFileLike } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MdAddChart } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { SiVirustotal } from "react-icons/si";

export default function DashSidebar() {
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      // console.log(tab, typeof tab);
    }
  }, [location.search]);

  return (
    <div className="relative z-30">
      <div
        className={`h-screen absolute md:w-50 w-44 md:text-base text-xs  ${
          isOpen ? "left-0" : "-left-56"
        } md:left-0   bg-white dark:bg-slate-600  p-3`}
      >
        <div className="text-center hidden md:block bg-indigo-500 dark:bg-indigo-800  text-white rounded-2xl p-1">
          Dashboard
        </div>
        <div className="mt-10 md:mt-1">
          <div>
            <div
              className={`flex items-center gap-2 ${
                tab === "overview"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <HiChartPie />
              <Link to="/dashboard?tab=overview">Overview</Link>
            </div>

            <div
              className={`flex items-center gap-2 ${
                tab === "profile"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <ImProfile />
              <Link to="/dashboard?tab=profile">Profile</Link>
            </div>

            <div
              className={`flex items-center gap-2 ${
                tab === "projects"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <HiViewBoards />
              <Link to="/dashboard?tab=projects">Projects</Link>
            </div>

            <div
              className={`flex items-center gap-2 ${
                tab === "addproject"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <MdAddChart />
              <Link to="/dashboard?tab=addproject">Add Project</Link>
            </div>
            <div
              className={`flex items-center gap-2 ${
                tab === "updateProfile"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <MdAddChart />
              <Link to="/dashboard?tab=updateProfile">Update Profile</Link>
            </div>

            <div
              className={`flex items-center gap-2 ${
                tab === "likeproject"
                  ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                  : "text-gray-700"
              } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
            >
              <TbFileLike />
              <Link to="/dashboard?tab=likeproject">Like Projected</Link>
            </div>

            {currentUser.isAdminRole && (
              <div
                className={`flex items-center gap-2 ${
                  tab === "users"
                    ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                    : "text-gray-700"
                } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
              >
                <HiUser />
                <Link to="/dashboard?tab=users">Users</Link>
              </div>
            )}

            {currentUser.isAdminRole && (
              <div
                className={`flex items-center gap-2 ${
                  tab === "totalLikedProjects"
                    ? "bg-indigo-500 dark:bg-indigo-900 text-white"
                    : "text-gray-700"
                } hover:bg-indigo-400 hover:text-white dark:text-white p-1 rounded-2xl mb-1`}
              >
                <SiVirustotal />
                <Link to="/dashboard?tab=totalLikedProjects">
                  Total Liked Projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className=" p-2 rounded-full text-indigo-500 focus:outline-none   cursor-pointer  h-6 justify-center items-center flex absolute top-4 left-2 md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen ? (
          <SlOptions />
        ) : (
          <div className="bg-indigo-500 dark:bg-indigo-800  text-white rounded-2xl p-2">
            Dashbored <span className="text-red-600 ml-2 ">X</span>
          </div>
        )}
      </div>
    </div>
  );
}
