import express from 'express';
import { createProjectController, getAllProjectsController, updateProjectController, updateProjectImageController, userProjectsController, deleteProjectcontroller, likeProjectcontroller, userLikdeProjectsController, getProjectsController, AllProjectsController, alLikedProjectsController, isPublicProjectController, searchProjectsController } from '../controllers/project.controller.js';
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { upload } from './../middlewares/multer.middleware.js';



const router = express.Router();


router.post("/createproject", verifyJWT, upload.single("projectImage"), createProjectController);

//admin all projects
router.get("/allprojects", verifyJWT, AllProjectsController);

//all projects
router.get("/getallproject", getAllProjectsController);

//search projects
router.get("/searchprojects", searchProjectsController);

//get singal project by id
router.get("/getproject/:projectId", verifyJWT, getProjectsController);

//user projects
router.get("/userallproject/:userId", verifyJWT, userProjectsController);

router.put("/updateProject/:projectId", verifyJWT, updateProjectController);

router.put("/updateProjectImage/:projectId", verifyJWT,
       upload.single("projectImage"), updateProjectImageController);

router.delete("/deleteProject/:projectId", verifyJWT, deleteProjectcontroller);

// like project by user
router.post("/likeProject/:projectId", verifyJWT, likeProjectcontroller);



router.get("/userLikdedProjects", verifyJWT, userLikdeProjectsController);

router.get("/allLikedProjects", verifyJWT, alLikedProjectsController);

router.put("/isPublicProject/:projectId", verifyJWT, isPublicProjectController);



export default router