import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function UserProjects() {
  const {  token } = useSelector((state) => state.user);

  const { userId } = useParams();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com/api/project/userallproject/${userId}`,
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

  return (
    <div className="p-5">
    <div className="bg-white dark:bg-slate-600 shadow-lg  border border-gray-300 rounded-xl mt-5 p-4">
      <h6 className="border-b border-gray-300 p-1  mb-4 text-slate-700 dark:text-slate-200 md:text-3xl">
        Projects
      </h6>

      <div className="flex gap-3 flex-col">
        {projects?.length ? (
          projects?.map((proj) => (
            <>
              <div
                className="group relative w-full  overflow-hidden rounded-lg  transition-all"
                key={proj._id}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={proj.createdBy.profileImage.secure_url}
                    alt={`${proj.createdBy.usernam}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold hover:underline cursor-pointer dark:text-sl">
                      <Link to={`/user/${proj.createdBy._id}`}>
                        {proj.createdBy.username}
                      </Link>
                    </h3>
                    <p className="text-xs ">
                      {proj?.createdBy?.headline}
                    </p>
                  </div>
                </div>

                <p className="text-gray-800 dark:text-slate-100 mb-4">{proj?.description}</p>
                <img
                  src={proj?.projectImage?.secure_url}
                  alt="post cover"
                  className="w-full h-60 object-cover rounded-md mb-4"
                />

                <div className="p-3 flex flex-col gap-1 text-gray-600 dark:text-slate-200">
                  <p className="text-lg font-semibold ">{proj.title}</p>
                  <span className="italic text-sm ">
                    {proj.category}
                  </span>
                  <span className="italic text-sm">
                    {proj.description.split(" ").slice(0, 5).join(" ") + ".."}
                  </span>
                  <Link
                    to={`/project/${proj._id}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] md:left-0 right-0 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-center md:py-2 rounded-md !rounded-tl-none m-2 w-1/4 md:mx-auto text-xs"
                  >
                    View Project Details
                  </Link>
                </div>
              </div>
            </>
          ))
        ) : (
          <p className="text-red-800 dark:text-red-400 text-sm p-2">
            Add your projects to Showcaise and help new developers.
          </p>
        )}
      </div>

      <Link to={"/projects"} className="text-center">
        <p className="p-2 text-slate-500 hover:bg-slate-300 hover:underline rounded-xl">
          Show All Projects
        </p>
      </Link>
    </div>
    </div>
  );
}
