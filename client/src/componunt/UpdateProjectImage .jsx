import { useSelector } from "react-redux";
import ButtonCom from "./helperComp/ButtonCom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProjectImage() {
  const [baseImage, setBaseImage] = useState("");
  const [file, setFile] = useState(null);

  const [project, setProject] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const navigate = useNavigate();

  const { projectId } = useParams();


  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/project/getproject/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(data, "data");

      if (data.success === false) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.success === true) {
        setLoading(false);
        setProject(data.data);
      }
    };

    fetchProject();
  }, [projectId, token]);

  const onChangehandleimage = (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleimageUpload = async () => {
    setLoadingImage(true);
    const { data } = await axios.put(
      `http://localhost:3000/api/project/updateProjectImage/${projectId}`,
      {
        projectImage: file,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success === false) {
      setLoadingImage(false);
      return toast.error(data.message);
    }

    if (data.success === true) {
      setLoadingImage(false);
      toast.success(data.message);
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <>
      <div className="relative p-4 max-w-4xl mx-auto bg-white dark:bg-slate-600 rounded-lg shadow-md">
        {loading ? (
          <div className="animate-pulse flex flex-col items-center justify-center space-y-6">
            <h1 className="w-1/4 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg "></h1>

            <div className=" h-80 w-full   rounded-lg   bg-gray-300 dark:bg-gray-700"></div>

            <div className="w-1/2 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg "></div>
          </div>
        ) : (
          <>
            <h1
              className={`my-7 text-center font-semibold text-3xl ${
                loading && "opacity-50"
              }`}
            >
              <span className="text-indigo-500">Update </span>Pro
              <span className="text-indigo-500">F</span>ile Image
            </h1>

            <div className={`space-y-6 ${loading && "opacity-10"}`}>
      
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-80  rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={project?.projectImage?.secure_url}
                    alt="Project Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                {baseImage && (
                  <div className="flex-1 h-80 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={baseImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>


              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onChangehandleimage}
                  className="rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-400 bg-indigo-100 dark:bg-slate-500 text-indigo-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-indigo-700 file:bg-indigo-200 hover:file:bg-indigo-300"
                />
                <div className="mt-2 sm:mt-0" onClick={handleimageUpload}>
                  <ButtonCom text={"Upload Image"} />
                </div>
              </div>
            </div>
          </>
        )}
        {loadingImage && (
          <div className="bg-slate-500 dark:bg-slate-600 bg-opacity-50 absolute h-screen w-[1000px] -top-5 -left-12">
            <div className="h-screen flex items-center   justify-center w-full  ">
              <div className="  text-gray-600 dark:text-gray-300 flex justify-center items-center flex-col rounded-lg dark: gap-5 text-4xl">
                <p className=" pl-0 ">
                  <span className="border  border-gray-600 dark:border-gray-300 rounded-lg md:p-1 hover:text-indigo-500/100 dark:text-gray-300">
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
    </>
  );
}
