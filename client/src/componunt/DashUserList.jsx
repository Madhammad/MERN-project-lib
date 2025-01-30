import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DashUserList() {
  const { token } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingdelete, setLoadingdelete] = useState(false);

  const [userId, setUserId] = useState("");

  const [showModel, setShowModel] = useState(false);

  const myArray = new Array(4).fill(null);

  useEffect(() => {
    const allUser = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3000/api/auth/allUsers",
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

    allUser();
  }, [token]);

  const handleDeleteAccount = async () => {
    setLoadingdelete(true);
    const { data } = await axios.delete(
      `http://localhost:3000/api/auth/deleteUser/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success === false) {
      setShowModel(false);
      setLoadingdelete(false);
      return toast.error(data.message);
    }
    if (data.success === true) {
      setShowModel(false);
      setLoadingdelete(false);
      toast.success(data.message);
      setUsers(users.filter((user) => user._id !== userId));
      return toast.success(data.message);
    }
  };

  return (
    <div className="overflow-x-auto relative">
      {loading ? (
        <div className="animate-pulse">
          <div className="mb-4 w-full flex justify-center">
            <ReactLoading
              type="spinningBubbles"
              color="rgb(88 80 236)"
              height="2%"
              width="5%"
              delay={100}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b-2 border-gray-400 dark:border-slate-800">
                <tr>
                  {Array(7)
                    .fill()
                    .map((_, idx) => (
                      <th
                        key={idx}
                        className="bg-slate-300 dark:bg-slate-500 border-r-2 border-gray-200 dark:border-slate-800"
                      >
                        <div className="bg-slate-500 w-full h-10 rounded-lg"></div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {myArray.map((_, ind) => (
                  <tr key={ind} className="dark:border-gray-700">
                    {Array(7)
                      .fill()
                      .map((_, colIdx) => (
                        <td
                          key={colIdx}
                          className={`p-1 ${
                            colIdx === 0 ? "bg-slate-400" : "bg-slate-300"
                          } dark:bg-slate-600`}
                        >
                          <div className="bg-slate-700 w-full h-12 rounded-lg"></div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-6 text-center font-semibold text-4xl">
            <span className="text-indigo-500">All </span>U
            <span className="text-indigo-500">s</span>ers
          </h1>

          <table className="w-full border-collapse overflow-hidden text-sm rounded-lg shadow-lg">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="px-4 py-3 border-r">Image</th>
                <th className="px-4 py-3 border-r">User Name</th>
                <th className="px-4 py-3 border-r">Email</th>
                <th className="px-4 py-3 border-r">Category</th>
                <th className="px-4 py-3 ">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="p-3 w-20 h-20">
                    <img
                      src={user.profileImage.secure_url}
                      alt={`Avatar of ${user.username}`}
                      className="w-full h-full object-cover rounded-full "
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    <Link
                      to={`/user/${user._id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {user.username}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td
                    className={
                      user.isAdminRole
                        ? "text-indigo-500 dark:text-indigo-400 px-4 py-3"
                        : "px-4 py-3 text-gray-700 dark:text-gray-400"
                    }
                  >
                    {user.isAdminRole ? "Admin" : "User"}
                  </td>
                  <td
                    className="px-4 py-3 font-medium text-indigo-500 dark:text-indigo-400  hover:text-indigo-700 cursor-pointer "
                    onClick={() => {
                      setShowModel(true);
                      setUserId(user._id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 w-96 rounded-lg p-6">
            {/* Modal Header */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModel(false)}
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
                  onClick={() => setShowModel(false)}
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
