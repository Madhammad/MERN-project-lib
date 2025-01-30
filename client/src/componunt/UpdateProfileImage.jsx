import { useDispatch, useSelector } from "react-redux";
import ButtonCom from "./helperComp/ButtonCom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { update } from "../../store/auth/userSlice";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileImage() {
  const { currentUser } = useSelector((state) => state.user);

  const [baseImage, setBaseImage] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    setLoading(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    const { data } = await axios.put(
      `http://localhost:3000/api/auth/UpdateProfileImage/${currentUser._id}`,
      {
        profileImage: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success === false) {
      setLoading(false);
      return toast.error(data.message);
    }

    if (data.success === true) {
      setLoading(false);
      toast.success("User Profile Successfully Update");
      navigate("/dashboard?tab=profile");
      dispatch(update(data.data));
    }
  };

  return (
    <>
      <div className="relative p-4 max-w-4xl mx-auto bg-white dark:bg-slate-600 rounded-lg shadow-md">
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
                  src={currentUser?.profileImage?.secure_url}
                  alt="Project Image"
                  className="w-full h-full object-fill"
                />
              </div>
              {baseImage && (
                <div className="flex-1 h-80 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={baseImage}
                    alt="Preview"
                    className="w-full h-full object-fill"
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

        {loading && (
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
    </>
  );
}
