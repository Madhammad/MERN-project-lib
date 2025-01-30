import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to={"/"} className=" pl-0 text-indigo-500/100 ">
        <span className="border  border-indigo-500/100 rounded-lg md:p-1 px-1 hover:text-indigo-500/100 text-black dark:text-white">
          Pro<span className="text-indigo-500/100">J</span>ects
        </span>
        Lib
      </Link>
    </>
  );
}
