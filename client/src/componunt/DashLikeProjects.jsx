import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import ButtonCom from "./helperComp/ButtonCom";

export function DashLikeProjects() {
  const {  token } = useSelector((state) => state.user);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const myArray = new Array(4).fill(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://mern-project-lib.onrender.com/api/project/userLikdedProjects",
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
  }, [token]);

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
                  <th className="px-4 py-2 border-r">Category</th>
                  <th className="px-4 py-2 border-r">Likes</th>
                  <th className="px-4 py-2 border-r">Created By </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {projects.map((proj) => (
                  <tr
                    className="bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    key={proj._id}
                  >
                    <td className="p-2  w-16 h-16">
                      <img
                        src={proj.projectImage.secure_url}
                        alt="Project Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">
                      <Link
                        to={`/project/${proj._id}`}
                        className="text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        {proj.title.split(" ").slice(0, 3).join(" ") + ".."}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-400">
                      {proj.description.split(" ").slice(0, 3).join(" ") + ".."}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-400">
                      {proj.category.split(" ").slice(0, 3).join(" ") + ".."}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-400">
                      {proj.totalLikes.length}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/users/${proj.createdBy._id}`}
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {proj.createdBy.username}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" flex flex-col items-center gap-20 h-96 bg-slate-200 dark:bg-slate-600 rounded-lg p-10 ">
              <h1 className="text-center text-3xl font-semibold text-red-500 dark:text-red-400">
                No Projects like
              </h1>
              <Link to={"/projects"}>
                <ButtonCom text="Like Project" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
