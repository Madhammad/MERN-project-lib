import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteoldCloudinaryImage, uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from './../utils/errorHandler.js';
import { Project } from './../models/project.model.js';

export const signupController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {
      next(errorHandler(200, 'All fields are required'))
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return next(errorHandler(200, 'User already exist'));
    }

    const user = new User({
      username,
      email,
      password,

    });

    await user.save();

    res.status(200).json(new ApiResponse(200, user, "User sign up successfully"))

  } catch (error) {
    console.error(error);
    next(errorHandler(400, 'All User controller erorr'))


  }
};

export const signinController = async (req, res, next) => {
  const { username, email, password } = req.body;


  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(200, 'All fields are required'))
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existedUser) {
    return next(errorHandler(200, 'User not found'));
  }

  const matchPassword = await existedUser.isPasswordCorrect(password);

  if (!matchPassword) {
    return next(errorHandler(200, 'Invalid credentials'));
  }

  const token = await existedUser.generateAccessToken();

  const user = await User.findById(existedUser._id).select("-password")



  res.status(200).json(new ApiResponse(200, { token, user }, "user sign in successfully"))

};

export const signoutController = async (req, res) => {
  try {
    res
      .clearCookie('accessToken',)
      .status(200)
      .json(new ApiResponse(200, true, {}, 'User has been signed out'));
  } catch (error) {
    return res.status(404).json(new ApiResponse(400, {}, "Sign out error"))
  }

};

export const updateAccountDetails = async (req, res) => {
  const { username, email, headline, bio, skills } = req.body

  if (!username || !email) {
    return next(errorHandler(200, 'All fields are required'))
  }

  const user = await User.findByIdAndUpdate(
    req.params?.userId,
    {
      $set: {
        username,
        email,
        headline,
        bio,
        skills
      }
    },
    { new: true }

  ).select("-password")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
}

export const updateUserprofileIamge = async (req, res, next) => {
  const profileImagePath = req.file?.path

  if (!profileImagePath) {
    return  next(errorHandler(200, "profile image required"))
  }

  //TODO: delete old image - assignment


  const newProfileImage = await uploadOnCloudinary(profileImagePath, "profileImage")

  if (!newProfileImage) {
    return next(errorHandler(200, 'Image is required'))
  }

  const currentUser = await User.findById(req.params?.uersId)

  const oldprofileimagepublic_id = currentUser.profileImage.public_id

  if (oldprofileimagepublic_id) {
    await deleteoldCloudinaryImage(oldprofileimagepublic_id);
  }

  const user = await User.findByIdAndUpdate(
    req.params?.uersId,
    {
      $set: {
        profileImage: {
          secure_url: newProfileImage.secure_url,
          public_id: newProfileImage.public_id
        },
      }
    },
    { new: true }
  ).select("-password")

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Cover image updated successfully")
    )
}


export const deleteUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params?.uersId);

    if (!currentUser) {
      return next(errorHandler(404, "User not found"));
    }

    if (currentUser._id.toString() === req.params?.uersId || req.user.isAdminRole) {

      const userProjects = await Project.find({ createdBy: req.params?.uersId });

      for (const project of userProjects) {
        const projectImagePublicId = project.projectImage?.public_id;

        if (projectImagePublicId) {
          await deleteoldCloudinaryImage(projectImagePublicId);
        }
      }


      await Project.deleteMany({ createdBy: req.params?.uersId });

      const Userlikedprojects = await Project.find({ totalLikes: req.user._id });

      for (const project of Userlikedprojects) {
        await Project.findByIdAndUpdate(
          project._id,
          {
            $pull: { totalLikes: req.user._id },
          },
          { new: true }
        );
      }


      const profileImagePublicId = currentUser.profileImage?.public_id;
      if (profileImagePublicId) {
        await deleteoldCloudinaryImage(profileImagePublicId);
      }

      await User.findByIdAndDelete(req.params?.uersId);

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "User successfully deleted"));
    }

    return res.status(403).json(new ApiResponse(403, {}, "You are not authorized"));
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Error occurred while deleting user"));
  }
};



export const allUserController = async (req, res, next) => {

  if (!req.user?.isAdminRole) {
    return next(errorHandler(403, 'User is not Admin  not allowed to see all users'));
  }

  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return res.status(200).json(new ApiResponse(200, users, "List of Users"));
  } catch (error) {
    console.error('Error fetching users:', error);
    next(errorHandler(500, 'Internal Server Error: Unable to fetch users.'));
  }
};;


export const getUserController = async (req, res, next) => {

  try {
    const user = await User.findById(req.params?.userId).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "User"))
  } catch (error) {
    next(errorHandler(400, 'All User controller erorr'))
  }

};
