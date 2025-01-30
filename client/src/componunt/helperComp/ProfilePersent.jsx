import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const ProfilePersent = () => {
  const { currentUser } = useSelector((state) => state.user);

  const calculateProfileCompletion = () => {
    let completion = 0;

    if (currentUser?.username && currentUser.email) completion += 30;
    if (currentUser?.profileImage) completion += 20;
    if (currentUser?.headline) completion += 20;
    if (currentUser?.bio) completion += 15;
    if (currentUser?.skills && currentUser.skills.length > 0) completion += 15;

    return completion;
  };

  const completion = calculateProfileCompletion();

  // console.log(completion);

  return (
    <div className="w-64 p-4 dark:bg-slate-600 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2 ">
        
        <img
          src={currentUser?.profileImage?.secure_url}
          alt={`${currentUser?.usernam}'s profile`}
          className="w-24 h-24 rounded-full"
        />

        <p className="cursor-pointer hover:underline"><Link to={"/dashboard?tab=profile"}>{currentUser?.username}</Link></p>
        <p className="text-slate-400 ">{currentUser?.headline}</p>
      </div>
      <h2 className={`text-lg font-bold my-2 text-center ${completion === 100 ? "text-green-600 dark:text-green-400" : "text-red-400"}`}>
        {completion === 100 ? "Profile Completed" : "Update Profile"}
      </h2>
      <div className="mb-3">
        <div className="relative w-full h-3 bg-gray-300 rounded-full">
          <div
            className="absolute h-3 rounded-full bg-indigo-500"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-white text-center">{completion}% completed</p>
      </div>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <span
            className={
              currentUser?.username && currentUser?.email
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400"
            }
          >
            Username & Email:{" "}
            {currentUser?.username && currentUser?.email ? "✓" : "Incomplete"}
          </span>
        </li>
        <li>
          <span
            className={
              currentUser?.profileImage
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400"
            }
          >
            Profile Image: {currentUser?.profileImage ? "✓" : "Incomplete"}
          </span>
        </li>
        <li>
          <span
            className={
              currentUser?.headline
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400"
            }
          >
            Headline: {currentUser?.headline ? "✓" : "Incomplete"}
          </span>
        </li>
        <li>
          <span
            className={
              currentUser?.bio
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400"
            }
          >
            Bio: {currentUser?.bio ? "✓" : "Incomplete"}
          </span>
        </li>
        <li>
          <span
            className={
              currentUser?.skills && currentUser?.skills?.length > 0
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400"
            }
          >
            Skills:{" "}
            {currentUser?.skills && currentUser?.skills?.length > 0
              ? "✓"
              : "Incomplete"}
          </span>
        </li>
      </ul>
    </div>
  );
};
