import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ButtonCom from "./helperComp/ButtonCom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashAddproject() {
  const [title, setTitle] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [webSite, setWebsiteLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(false);

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      (event.key === "Tab" && inputValue.trim() !== "")
    ) {
      event.preventDefault();

      setTags([...tags, inputValue.trim()]);

      setInputValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const { token } = useSelector((state) => state.user);

  const handleUpdloadImage = async (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    // console.log("Form submitted")
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("details", details);
    formData.append("webSite", webSite);
    formData.append("githubLink", githubLink);
    formData.append("tags", tags);
    formData.append("projectImage", file);

    const { data } = await axios.post(
      "http://localhost:3000/api/project/createproject",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    // console.log(data, "data");

    if (data.success === false) {
      setLoading(false);
      toast.error(data.message);
      return;
    }
    if (data.success === true) {
      setLoading(false);
      toast.success("Successfully Register");
      navigate("/projects");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen relative card-body flex flex-col gap-4   bg-white dark:bg-blue-950 rounded-lg shadow-2xl">
      <h1
        className={`text-center text-3xl mb-2 font-semibold ${
          loading && "opacity-30"
        }`}
      >
        <span className="text-indigo-500">Add</span> Pro
        <span className="text-indigo-500">J</span>ects
      </h1>

      <form
        className={`flex flex-col gap-4 ${loading && "opacity-30"}`}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
            onChange={(e) => setTitle(e.target.value)}
          />
          <small
            className={`${
              title.length > 100 ? "text-red-400" : "text-slate-400"
            }`}
          >
            {title.length}/100 characters
          </small>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <textarea
            type="text"
            placeholder="Description"
            required
            id="description"
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
            onChange={(e) => setDescription(e.target.value)}
          />
          <small
            className={`${
              description.length > 500 ? "text-red-400" : "text-slate-400"
            }`}
          >
            {description.length}/500 characters
          </small>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Category"
            required
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Website Link"
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
            onChange={(e) => setWebsiteLink(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="GitHub Link"
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <div className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-1 flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="mb-1 border p-2 text-xs rounded-lg">
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-1 p-1 text-xs border hover:border-indigo-500 hover:text-indigo-500"
                  onClick={() => handleRemoveTag(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 text-xs border rounded-lg dark:bg-gray-800"
            placeholder="Type a tag and press Enter"
          />
        </div>

        <div className="flex items-center justify-between border-4 border-indigo-500 border-dotted p-3 gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-1 w-full md:w-1/3 border rounded-lg dark:bg-gray-800"
          />
          <button
            type="button"
            className="p-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            onClick={handleUpdloadImage}
          >
            Upload Image
          </button>
        </div>

        {baseImage && (
          <img
            src={baseImage}
            alt="Uploaded Preview"
            className="w-full h-72 object-cover rounded-lg mt-4"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className=" mb-12 h-52  "
          required
          onChange={(value) => setDetails(value)}
        />

        <button
          type="submit"
          className="w-full  bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          <ButtonCom text={"Add"} />
        </button>
      </form>

      {loading && (
        <div className="bg-slate-300 dark:bg-slate-600 bg-opacity-50 absolute h-[700px] w-[1000px] -top-5 -left-32">
          <div className="h-[700px] flex items-center   justify-center w-full  ">
            <div className="  text-gray-700 dark:text-gray-300flex justify-center items-center flex-col rounded-lg gap-5 text-4xl">
              <p  className=" pl-0 ">
                <span className="border  border-gray-700 dark:border-gray-300 rounded-lg md:p-1  ">
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
