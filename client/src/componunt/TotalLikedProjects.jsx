import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";

export function TotalLikedProjects() {
  const { currentUser, token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const myArray = new Array(4).fill(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://mern-project-lib.onrender.com/api/project/allLikedProjects",
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

  return (
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
            <span className="text-indigo-500">All Liked </span>Pro
            <span className="text-indigo-500">J</span>ects
          </h1>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="bg-indigo-400 dark:bg-indigo-950 border-r-2 border-gray-200 px-4 py-2 text-left text-white">
                  Image
                </th>
                <th className="bg-indigo-400 dark:bg-indigo-950 border-r-2 border-gray-200 px-4 py-2 text-left text-white">
                  Project Title
                </th>
                <th className="bg-indigo-400 dark:bg-indigo-950 border-r-2 border-gray-200 px-4 py-2 text-left text-white">
                  Description
                </th>
                <th className="bg-indigo-400 dark:bg-indigo-950 border-r-2 border-gray-200 px-4 py-2 text-left text-white">
                  Category
                </th>

                <th className="bg-indigo-400 dark:bg-indigo-950 border-r-2 border-gray-200 px-4 py-2 text-left text-white">
                  {currentUser.isAdminRole ? "Created By" : "Edit"}
                </th>
                <th className="bg-indigo-400 dark:bg-indigo-950 px-4 py-2 text-left text-white">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((proj) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                  key={proj._id}
                >
                  <td className="px-4 py-2">
                    <img
                      src={proj.projectImage.secure_url}
                      alt="Project"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    <Link
                      to={`/project/${proj._id}`}
                      className="text-indigo-600 dark:text-indigo-400  hover:underline"
                    >
                      {proj.title.split(" ").slice(0, 3).join(" ") + ".."}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {proj.description.split(" ").slice(0, 3).join(" ") + ".."}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {proj.category.split(" ").slice(0, 3).join(" ") + ".."}
                  </td>

                  {currentUser.isAdminRole ? (
                    <td className="px-4 py-2">
                      <Link
                        to={`/users/${proj.createdBy._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {proj.createdBy.username}
                      </Link>
                    </td>
                  ) : (
                    <td className="px-4 py-2">
                      <Link
                        to={`/users/${proj.createdBy._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                    </td>
                  )}

                  <td className="px-4 py-2">
                    <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
