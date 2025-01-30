import { Route, Routes } from "react-router-dom";

import Header from "./componunt/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import DashBorad from "./pages/DashBorad";
import { DashUser } from "./componunt/DashUser";
import { Projects } from "./pages/Projects";
import { FooterCom } from "./componunt/FooterCom";
import DashProject from "./componunt/Dashproject";
import DashUpdateproject from "./componunt/DashUpdateproject";
import UpdateProjectImage from "./componunt/UpdateProjectImage ";
import { ProjectSearch } from "./pages/ProjectSearch";
import { UserProjects } from "./pages/UserProjects";
import { UserProjectedRoute } from "./componunt/helperComp/UserProjectedRoute";
import { ProfilePersent } from "./componunt/helperComp/ProfilePersent";
import { About } from "./pages/About";

function App() {
  return (
    <>
      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/search" element={<ProjectSearch />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/pp" element={<ProfilePersent />} />

        {/* <Route element={<PrivateRoute />}> */}

        <Route element={<UserProjectedRoute />}>
          <Route path="/dashboard" element={<DashBorad />} />
          <Route path="/userProjects/:userId" element={<UserProjects />} />
          <Route path="/project/:projectId" element={<DashProject />} />
          <Route path="/user/:userId" element={<DashUser />} />
          <Route
            path="/updateProject/:projectId"
            element={<DashUpdateproject />}
          />
          <Route
            path="/updateProjectImage/:projectId"
            element={<UpdateProjectImage />}
          />
        </Route>
      </Routes>
      <FooterCom />
    </>
  );
}

export default App;
