// import { Avatar, Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonCom from "./helperComp/ButtonCom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiCheckCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import ReactLoading from "react-loading";

export function DashProjects() {
  const { currentUser, token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [projId, setProjId] = useState("");

  const [loading, setLoading] = useState(false);

  const myArray = new Array(4).fill(null);

  useEffect(() => {
    if (currentUser.isAdminRole) {
      const fetchProjects = async () => {
        setLoading(true);
        const { data } = await axios.get(
          "https://mern-project-lib.onrender.com/api/project/allprojects",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success === false) {
          setLoading(false);
          return toast.error(data.error.message);
        }
        if (data.success === true) {
          setLoading(false);
          setProjects(data.data);
        }
      };

      fetchProjects();
    }

    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com/api/project/userallproject/${currentUser._id}`,
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
  }, [currentUser.isAdminRole, token]);

  const handleDelete = async () => {
    setShowModal(false);
    setLoading(true)

    const { data } = await axios.delete(
      `https://mern-project-lib.onrender.com/api/project/deleteProject/${projId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success === false) {
      setLoading(false)
      return toast.error(data.message);
    }
    if (data.success === true) {
      setLoading(false)
      setProjects(projects.filter((proj) => proj._id !== projId));
      return toast.success(data.message);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
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
            <h1 className="mb-4 text-center font-semibold text-3xl">
              <span className="text-indigo-500">All </span>Pro
              <span className="text-indigo-500">J</span>ects
            </h1>

            {projects.length ? (
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="px-4 py-2 border-r">Image</th>
                    <th className="px-4 py-2 border-r">Project Title</th>
                    <th className="px-4 py-2 border-r">Description</th>
                    <th className="px-4 py-2 border-r">Public Status</th>
                    <th className="px-4 py-2 border-r">Likes</th>
                    <th className="px-4 py-2 border-r">
                      {currentUser.isAdminRole ? "Created By" : "Edit"}
                    </th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((proj) => (
                    <tr
                      key={proj._id}
                      className="bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <td className="p-2 w-16 h-16">
                        <img
                          src={proj.projectImage.secure_url}
                          alt="Project Avatar"
                          className="rounded-full w-full h-full "
                        />
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">
                        <Link
                          to={`/project/${proj._id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {proj.title.split(" ").slice(0, 3).join(" ") + ".."}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-400">
                        {proj.description.split(" ").slice(0, 3).join(" ") +
                          ".."}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Link
                          to={
                            currentUser?._id === proj.createdBy?._id
                              ? `/project/${proj._id}`
                              : "#"
                          }
                          className={`text-3xl cursor-pointer ${
                            proj.isPublic
                              ? "text-indigo-500 dark:text-indigo-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {proj.isPublic ? <BiCheckCircle /> : <ImCross />}
                        </Link>
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          proj.likes ? "text-gray-700" : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {proj.likes || "No Likes"}
                      </td>
                      <td className="px-4 py-2">
                        {currentUser.isAdminRole ? (
                          <Link
                            to={`/users/${proj?.createdBy?._id}`}
                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            {proj?.createdBy?.username}
                          </Link>
                        ) : (
                          <Link
                            to={`/updateProject/${proj._id}`}
                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            Edit
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <p
                          className="text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                          onClick={() => {
                            setShowModal(true);
                            setProjId(proj._id);
                          }}
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=" flex flex-col items-center gap-20 h-96 bg-slate-200 dark:bg-slate-600 rounded-lg p-10 ">
                <h1 className="text-center text-3xl font-semibold text-red-500">
                  No Projects
                </h1>
                <Link to={"/dashboard?tab=addproject"}>
                  <ButtonCom text="App Projects" />
                </Link>
              </div>
            )}
          </>
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
                    className="px-4 py-2 bg-red-500 dark:bg-red-400 text-white rounded-lg hover:bg-red-600"
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
