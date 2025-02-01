import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, update } from "../../store/auth/userSlice";

import { CiEdit } from "react-icons/ci";
import { FaExpeditedssl } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function UpdateProfile() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser, token } = useSelector((state) => state.user);

  const [isUpdate, setUpdate] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [headline, setheadline] = useState(currentUser.headline);
  const [bio, setbio] = useState(currentUser.bio);
  const [skills, setskills] = useState(currentUser.skills);

  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setShowModal(false);
    setLoading(true);
    if (!token) {
      return toast.error("No token found, please log in");
    }

    setLoading(true);
    const { data } = await axios.delete(
      `https://mern-project-lib.onrender.com//api/auth/deleteUser/${currentUser._id}`,
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
      dispatch(signOut());
      navigate("/");
      toast.success("User Successfully delete");
      localStorage.removeItem("token");
    }
  };

  const startUpdate = () => {
    setUpdate((prevState) => !prevState);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      (event.key === "Tab" && inputValue.trim() !== "")
    ) {
      event.preventDefault();

      setskills([...skills, inputValue.trim()]);

      setInputValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setskills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();

    // try {
    const { data } = await axios.put(
      `https://mern-project-lib.onrender.com//api/auth/updateUser/${currentUser._id}`,
      {
        username: username,
        email: email,
        headline: headline,
        bio: bio,
        skills: skills,
      },
      {
        withCredentials: true,
      }
    );

    if (data.success === false) {
      setLoading(false);
      return toast.error(data.error);
    }

    if (data.success === true) {
      setLoading(false);
      toast.success("User Profile Successfully Update");
      dispatch(update(data.data));
      startUpdate();
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full relative">
        <div
          className={`${
            loading && "opacity-30"
          } p-4 max-w-3xl mx-auto min-h-screen relative card-body flex flex-col gap-4   bg-white dark:bg-blue-950 rounded-lg shadow-2xl`}
        >
          <h1 className=" text-center font-semibold text-3xl">
            <span className="text-indigo-500">Update </span>Pro
            <span className="text-indigo-500">F</span>ile
          </h1>

          <form className="flex flex-col gap-4 p-4 ">
            <div>
              <input
                id="name"
                type="text"
                defaultValue={currentUser.username}
                required
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!isUpdate}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <input
                id="email1"
                type="email"
                defaultValue={currentUser.email}
                required
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isUpdate}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <input
                id="skill"
                type="text"
                defaultValue={
                  currentUser.headline ? currentUser.headline : "Add Headline"
                }
                required
                onChange={(e) => setheadline(e.target.value)}
                readOnly={!isUpdate}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <input
                id="bio"
                type="text"
                defaultValue={currentUser?.bio || ""}
                placeholder="Add Your Bio"
                required
                onChange={(e) => setbio(e.target.value)}
                readOnly={!isUpdate}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-600 text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-600"
                  >
                    <span>{tag}</span>
                    {isUpdate && (
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveTag(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-800 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs"
                placeholder="Type a tag and press Enter"
                readOnly={!isUpdate}
              />
            </div>

            <button
              type="submit"
              disabled={!isUpdate}
              className={`w-full py-2 px-4 rounded-xl text-white ${
                isUpdate
                  ? "bg-indigo-500 hover:bg-indigo-700"
                  : "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
              }`}
              onClick={handleUpdate}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>

          <div className="text-red-800 dark:text-red-500 flex justify-between mt-5">
            <span
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Delete Account
            </span>
          </div>

          <div
            className="absolute top-10 right-6 text-indigo-600 md:text-2xl text-sm  "
            onClick={startUpdate}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {!isUpdate ? <FaExpeditedssl /> : <CiEdit />}
          </div>
          {isHover && (
            <div className="absolute top-5 text-xs right-8 md:block hidden bg-blue-100 p-2 rounded-3xl text-slate-500">
              Click to Update Profile
            </div>
          )}
        </div>
        {loading && (
          <div className="bg-slate-900 bg-opacity-30 absolute h-screen w-[1000px] -top-5 -left-60">
            <div className="h-screen flex items-center   justify-center w-full  ">
              <div className="  text-gray-600 flex justify-center items-center flex-col rounded-lg gap-5 text-4xl">
                <p className=" pl-0 ">
                  <span className="border  border-gray-600 rounded-lg md:p-1 hover:text-indigo-500/100 ">
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 w-96 rounded-lg p-6">
              {/* Modal Header */}
              <div className="flex justify-end">
                <button
                  onClick={() => showModal(false)}
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
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => showModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
