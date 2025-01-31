import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GrLike } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { BiCheckCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProject() {
  const { projectId } = useParams();

  const { currentUser, token } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);

  const [project, setProject] = useState({});

  const [showisPublicModal, setShowisPublicModal] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-project-lib.onrender.com/api/project/getproject/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

   

      if (data.success === false) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.success === true) {
        setLoading(false);
        setProject(data.data);
      }
    };

    fetchProjects();
  }, [projectId, token]);

  const handlelike = async () => {
    const { data } = await axios.post(
      `https://mern-project-lib.onrender.com/api/project/likeProject/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    

    if (data.success === false) {
      return toast.error(data.error);
    }
    if (data.success === true) {
      setProject(data.data);
      // console.log(project, "project");
    }
  };

  const handleisPublic = async () => {
    setShowisPublicModal(false);

    const { data } = await axios.put(
      `https://mern-project-lib.onrender.com/api/project/isPublicProject/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(data, "data");

    if (data.success === false) {
      return toast.error(data.error.message);
    }
    if (data.success === true) {
      setProject(data.data);
      return toast.success(data.message);
    }
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl justify-center items-center min-h-screen mx-auto relative">
      {loading ? (
        <div className="animate-pulse w-full  ">
          <h1 className=" mt-2  max-w-2xl mx-auto  bg-slate-300 dark:bg-slate-500 p-1 h-12 w-1/2"></h1>

          <div className="self-center my-2 p-1 mx-auto h-12 w-1/3 bg-slate-300 dark:bg-slate-500"></div>

          <div className=" mx-auto cursor-pointer rounded-3xl  w-1/12 h-12 bg-slate-300 dark:bg-slate-500"></div>

          <div className="mt-5 p-3 h-[600px] w-full object-cover rounded-lg bg-slate-300 dark:bg-slate-500"></div>

          <div className=" p-2 mt-1 border-b border-slate-500 mx-auto  w-6/12 h-10  bg-slate-300 dark:bg-slate-500"></div>

          <div className="mx-auto  bg-slate-300 dark:bg-slate-500 p-3 mt-1 w-6/12 h-20"></div>

          <div className="flex justify-between p-3 border-b dark:bg-slate-500 border-slate-600 mx-auto w-full max-w-2xl text-xs">
            <div className="r bg-slate-300 h-10 w-20 dark:bg-slate-500"></div>

            <span className=" bg-slate-300 h-10 w-20 dark:bg-slate-500"></span>
          </div>

          <div className="bg-slate-300 mx-auto h-8 w-6/12 my-1 dark:bg-slate-500"></div>

          <div className="p-3 max-w-2xl mx-auto w-full project-content bg-slate-300 dark:bg-slate-500 h-screen"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-600 shadow-2xl flex flex-col justify-center items-center w-full">
          <h1 className="text-3xl mt-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {project?.title}
          </h1>

          <Link
            to={`/search?category=${project?.category}`}
            className="self-center mt-1"
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-lg text-center">
              {project?.category}
            </p>
          </Link>

          {currentUser?._id === project?.createdBy?._id && (
            <div
              className="flex justify-center gap-2 mt-5 text-xl items-center cursor-pointer border p-2 rounded-3xl hover:bg-gray-100 dark:hover:bg-slate-700 w-fit text-center "
              onClick={() => setShowisPublicModal(true)}
            >
              <span> Public: </span>
              <p
                className={
                  project?.isPublic
                    ? "text-indigo-600 dark:text-indigo-400 "
                    : "text-red-500 dark:text-red-400"
                }
              >
                {project?.isPublic ? <BiCheckCircle /> : <ImCross />}
              </p>
            </div>
          )}

          <img
            src={project?.projectImage?.secure_url}
            alt={project.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover rounded-lg"
          />

          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>
              Added By:{" "}
              <span className="text-indigo-500 dark:text-indigo-400 hover:underline font-bold">
                <Link to={`/user/${project?.createdBy?._id}`}>
                  {project?.createdBy?.username}
                </Link>
              </span>
            </span>
            <span className="italic">
              {(project?.details?.length / 1000).toFixed(0)} mins read
            </span>
          </div>

          <div className="mx-auto w-full p-3 max-w-2xl">
            <div className="flex gap-5">
              <p className="text-sm">Website:</p>
              {project?.webSite ? (
                <a
                  href={project.webSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 dark:text-indigo-400 text-xs hover:underline"
                >
                  Visit Website
                </a>
              ) : (
                <p className="text-red-500 dark:text-red-400 text-xs">
                  No Website Link
                </p>
              )}
            </div>

            <div className="flex gap-5">
              <p className="text-sm">Code Source:</p>

              {project?.githubLink ? (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 dark:text-indigo-400 text-xs hover:underline"
                >
                  Visit Code Source
                </a>
              ) : (
                <p className="text-red-500 dark:text-red-400 text-xs">
                  No Code Source Available
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <div className="flex gap-2 items-center">
              Likes:{" "}
              <span className="text-indigo-500">
                {project?.totalLikes?.length
                  ? project?.totalLikes?.length
                  : "None"}
              </span>
            </div>

            <span
              onClick={handlelike}
              className={`cursor-pointer font-bold ${
                project?.totalLikes?.includes(currentUser._id)
                  ? "text-indigo-500"
                  : "text-slate-500"
              }`}
            >
              <GrLike />
            </span>
          </div>

          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <div className="flex gap-2 items-center">
              Tags:{" "}
              <div className="flex flex-wrap gap-1">
                {project?.tags?.map((tag, ind) => (
                  <p
                    className="bg-slate-100 dark:bg-slate-600 p-2 rounded-lg"
                    key={ind}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`p-3 max-w-2xl mx-auto w-full project-content ${theme}`}
            dangerouslySetInnerHTML={{ __html: project?.details }}
          ></div>

          {currentUser._id === project?.createdBy?._id && (
            <>
              <div className="md:top-16 top-18 md:right-14 right-10 absolute border border-indigo-500 md:p-3 p-1  rounded-full text-indigo-500 dark:text-indigo-200 hover:scale-125 hover:text-indigo-500 ">
                <Link to={`/updateProject/${projectId}`}>
                  <CiEdit />
                </Link>
              </div>
              <div className="md:top-56 top-60 md:right-14 right-10 absolute border border-indigo-500 md:p-3 p-1  rounded-full text-indigo-500  dark:text-indigo-200 hover:scale-125 hover:text-indigo-500">
                <Link to={`/updateProjectImage/${projectId}`}>
                  <CiEdit />
                </Link>
              </div>
            </>
          )}
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

            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                {project?.isPublic ? "Make Private" : "Make Public"}
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleisPublic}
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
    </main>
  );
}
