export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800  flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white dark:dark:bg-blue-950 shadow-xl rounded-2xl p-6">
        <h1 className="dark:text-gray-400 text-gray-700 text-3xl mb-4 text-center">
          MERN Project Showcase Platform
        </h1>
        <p className="dark:text-gray-500 text-gray-600 text-lg mb-6">
          This is a full-stack web application built using the{" "}
          <span className="font-semibold">MERN stack</span> (MongoDB,
          Express.js, React, and Node.js) along with the power of{" "}
          <span className="font-semibold">Tailwind CSS</span> for sleek and
          responsive UI design.
        </p>

        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">Purpose</h2>
        <ul className="list-disc list-inside dark:text-gray-500 text-gray-600 mb-6">
          <li>
            <span className="font-semibold">Students:</span> Share your academic
            projects and build your portfolio.
          </li>
          <li>
            <span className="font-semibold">Developers:</span> Upload your
            innovative creations, connect with like-minded peers, and gain
            visibility.
          </li>
          <li>
            <span className="font-semibold">Project Seekers:</span> Browse and
            explore various development projects for learning or collaboration.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-400 mb-3">
          Key Features
        </h2>
        <ul className="list-disc list-inside dark:text-gray-500 text-gray-600">
          <li>
            <span className="font-semibold">User Authentication:</span> Secure
            login and signup for uploading and managing projects.
          </li>
          <li>
            <span className="font-semibold">Project Showcase:</span> Visitors
            can view all uploaded projects, complete with descriptions and
            links.
          </li>
          <li>
            <span className="font-semibold">Responsive Design:</span> Tailored
            for all devices using Tailwind CSS, ensuring an optimal user
            experience.
          </li>
          <li>
            <span className="font-semibold">Real-Time Backend:</span> Built with
            MongoDB for storage, Node.js, and Express.js for API management.
          </li>
        </ul>
      </div>
    </div>
  );
};
