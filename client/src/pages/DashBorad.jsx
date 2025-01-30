import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../componunt/DashProfile";
import DashSidebar from "../componunt/DashSidebar";
import DashOverview from "./../componunt/DashOverview";

import DashAddproject from "../componunt/DashAddproject";
import { DashUserList } from "../componunt/DashUserList";
import { DashProjects } from "./../componunt/DashProjects";
import UpdateProfile from "./../componunt/UpdateProfile";
import UpdateProfileImage from "../componunt/UpdateProfileImage";
import { DashLikeProjects } from "./../componunt/DashLikeProjects";
import { useSelector } from "react-redux";
import { TotalLikedProjects } from "../componunt/TotalLikedProjects";

export default function DashBorad() {
  const { currentUser } = useSelector((state) => state.user);

  const location  = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");

    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-60">
        <DashSidebar />
      </div>
      <div className="flex-1 p-5">
        {tab === "overview" && <DashOverview />}

        {tab === "profile" && <DashProfile />}

        {tab === "updateProfile" && <UpdateProfile />}

        {tab === "updateProfileImage" && <UpdateProfileImage />}

        {tab === "projects" && <DashProjects />}

        {tab === "addproject" && <DashAddproject />}

        {currentUser?.isAdminRole && tab === "users" && <DashUserList />}

        {currentUser?.isAdminRole && tab === "totalLikedProjects" && (
          <TotalLikedProjects />
        )}

        {tab === "likeproject" && <DashLikeProjects />}
      </div>
    </div>
  );
}
