import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../store/auth/userSlice";
import { toast } from "react-hot-toast";

import Logo from "./helperComp/Logo";
import ButtonCom from "./helperComp/ButtonCom";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../store/theme/themeSlice";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.theme);

  // const path = useLocation().pathname;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    const { data } = await axios.post(
      `https://mern-project-lib.onrender.com/api/auth/signout/${currentUser._id}`,
      {
        withCredentials: true,
      }
    );

    if (data.success === false) {
      return toast.error(data.message);
    }

    if (data.success === true) {
      dispatch(signOut());
      navigate("/");
      toast.success("User Out log Successfully");
    }
  };

  return (
    <nav className="bg-indigo-100 sticky top-0 z-50 dark:bg-[#021024] shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex shrink-0 items-center">
              <Logo />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    location.pathname === "/"
                      ? "bg-indigo-500 dark:bg-indigo-800 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    location.pathname === "/projects"
                      ? "bg-indigo-500 dark:bg-indigo-800 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    location.pathname === "/about"
                      ? "bg-indigo-500 dark:bg-indigo-800 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
            {currentUser && (
              <div>
                <Link
                  to="/dashboard?tab=addproject"
                  className="text-indigo-500 p-2 text-center rounded-full hidden md:flex items-center justify-center bg-white dark:bg-slate-700 hover:shadow-md text-sm dark:text-indigo-400 transition "
                >
                  Add Project
                </Link>
                <Link
                  to="/dashboard?tab=addproject"
                  className=" md:hidden w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-indigo-500 hover:shadow-md transition dark:text-indigo-400"
                >
                  <CiCirclePlus />
                </Link>
              </div>
            )}

            <button
              className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400 hover:shadow-md transition"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-indigo-500 hover:shadow-md transition dark:text-indigo-400">
              <Link to="/search">
                <AiOutlineSearch />
              </Link>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-10 h-10 rounded-full  focus:ring-2  dark:focus:ring-indigo-400   transition"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={currentUser?.profileImage?.secure_url}
                    alt="User"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black/5">
                    <p onClick={() => setIsDropdownOpen(false)}>
                      <Link
                        to="/dashboard?tab=overview"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white dark:hover:bg-slate-800 hover:bg-gray-100 transition"
                      >
                        Dashboard
                      </Link>
                    </p>

                    <p
                      onClick={() => {
                        handleSignOut();
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white cursor-pointer transition"
                    >
                      Sign out
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signIn">
                <ButtonCom text="Sign in" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
