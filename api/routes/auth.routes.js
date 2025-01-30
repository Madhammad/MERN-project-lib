import express from "express";
import {
  signinController,
  signoutController,
  signupController,
  updateAccountDetails,
  updateUserprofileIamge,
  deleteUser,
  allUserController,
  getUserController,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {  verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  signupController
);
router.post("/signin", signinController);
router.post("/signout/:uersId", signoutController);

router.put("/updateUser/:userId" ,updateAccountDetails);
router.put("/UpdateProfileImage/:uersId", upload.single("profileImage"), updateUserprofileIamge)

router.delete("/deleteUser/:uersId",verifyJWT, deleteUser);

router.get("/allUsers",verifyJWT,allUserController)

router.get("/user/:userId",verifyJWT,getUserController)

export default router;
