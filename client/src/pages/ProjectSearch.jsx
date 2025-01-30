import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonCom from "../componunt/helperComp/ButtonCom";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AiOutlineSearch } from "react-icons/ai";
import { GrLike } from "react-icons/gr";
import { ProfilePersent } from "../componunt/helperComp/ProfilePersent";
import { useSelector } from "react-redux";

export function ProjectSearch() {
  const { currentUser } = useSelector((state) => state.user);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
  });

  const [loading, setLoading] = useState(false);
  const myArray = new Array(6).fill(null);

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
      });
    }

    const fetchProjects = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();

      const { data } = await axios.get(
        `http://localhost:3000/api/project/searchprojects?${searchQuery}`
      );

      if (data.success === false) {
        setLoading(false);
        return toast.error(data.error);
      }
      if (data.success === true) {
        setSidebarData({ ...sidebarData, searchTerm: "" });
        setLoading(false);
        setProjects(data.data);
      }
    };

    // console.log(data, "data");

    fetchProjects();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="animate-pulse">
          <div className="">
            <div className="flex justify-center items-center gap-2 p-5">
              <div className="w-10 h-10 rounded-full bg-slate-600"></div>

              <button className="bg-slate-600 w-20 h-10 rounded-xl"></button>
            </div>
          </div>

          <div className="flex p-5 gap-5 flex-wrap justify-center  mt-2">
            {myArray.map((ind) => (
              <>
                <div
                  className="group relative w-full md:w-1/2  overflow-hidden rounded-lg  transition-all bg-slate-300 dark:bg-slate-600 p-3"
                  key={ind}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-500"></div>

                    <div className="ml-3 w-1/4 h-10 bg-slate-500 rounded-2xl"></div>
                  </div>

                  <p className="w-full h-10 bg-slate-500 mb-1 rounded-2xl "></p>
                  <div className="w-full h-60 bg-slate-500 rounded-2xl"></div>

                  <div className="p-3 flex flex-col gap-1 rounded-2xl">
                    <p className="w-1/4 h-10 bg-slate-500 rounded-2xl"></p>
                    <span className="w-1/4 h-10 bg-slate-500 rounded-2xl"></span>
                    <span className="w-1/4 h-10 bg-slate-500 rounded-2xl"></span>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="bg-slate-200 h-8 w-1/3   p-1 rounded-lg"></button>
          </div>
        </div>
      ) : (
        <>
          <form
            className="flex justify-center items-center gap-2 p-3"
            onSubmit={handleSubmit}
          >
            <div className="flex   items-center gap-2">
              <input
                placeholder="Search..."
                id="searchTerm"
                icon={<AiOutlineSearch />}
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="dark:bg-gray-800 rounded-xl p-2 md:w-full w-60 border-indigo-500 dark:border-indigo-400"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-indigo-500 hover:shadow-md transition dark:text-indigo-400 border border-indigo-500 dark:border-indigo-400"
              >
                <AiOutlineSearch />
              </button>
            </div>
          </form>
          <div className="flex justify-center  gap-2 md:px-20 p-1">
            {currentUser && (
              <div className="md:block hidden">
                <ProfilePersent />
              </div>
            )}
            <div className="rounded-lg w-full flex gap-2 flex-col">
              {projects.map((proj) => (
                <>
                  <div
                    className=" relative  w-full bg-white dark:bg-slate-600 shadow-lg rounded-lg p-3"
                    key={proj._id}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={proj.createdBy.profileImage.secure_url}
                        alt={`${proj.createdBy.usernam}'s profile`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3 dark:text-gray-300">
                        <h3 className="text-sm font-semibold hover:underline cursor-pointer ">
                          <Link to={`/user/${proj.createdBy._id}`}>
                            {proj.createdBy.username}
                          </Link>
                        </h3>
                        <h6 className="text-xs">{proj.createdBy?.headline}</h6>
                      </div>
                    </div>

                    <p className="text-gray-800 dark:text-slate-200 mb-4">
                      {proj.description}
                    </p>
                    <img
                      src={proj.projectImage.secure_url}
                      alt="post cover"
                      className="w-full h-60 object-cover rounded-md mb-4"
                    />

                    <div className="p-3 flex flex-col gap-1">
                      <p className="text-lg font-semibold ">{proj.title}</p>
                      <span className="italic text-sm text-gray-600">
                        {proj.category}
                      </span>
                      <span className="italic text-sm">
                        {proj.description.split(" ").slice(0, 5).join(" ") +
                          ".."}
                      </span>
                      <p className="italic text-sm border-t  border-gray-300 dark:border-slate-300 py-2">
                        <GrLike className="inline-block" /> :{" "}
                        {proj?.totalLikes?.length}
                      </p>
                      <Link
                        to={`/project/${proj._id}`}
                        className="z-10  absolute bottom-0  right-0 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-center md:py-2 rounded-md !rounded-tl-none m-2 w-1/4  text-xs"
                      >
                        View Project Details
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Link to={"/dashboard?tab=addproject"}>
              <ButtonCom text={"Add Projects"} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
