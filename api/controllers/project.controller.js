import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteoldCloudinaryImage, uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from './../utils/errorHandler.js';

export const createProjectController = async (req, res, next) => {
      const { title, description, category, details, webSite, githubLink, tags } = req.body

      if (
            !title || !description || !category || !details
      ) {
            return next(errorHandler(200, "All fields required"));
      }

      if (description.length > 500) {
            return next(errorHandler(200, "Description is too long"));
      }

      if (title.length > 100) {
            return next(errorHandler(200, "A title is too long"));
      }


      try {
            const projectImagePath = req.file?.path;


            const cloudnaryRes = await uploadOnCloudinary(
                  projectImagePath,
                  "projectImage"
            );


            if (!cloudnaryRes) {
                  return next(errorHandler(400, "cloudinary image upload error "));
            }

            const addtags = tags?.split(",").map((tag) => tag.trim());

            const newPorject = new Project({
                  title,
                  description,
                  category,
                  details,
                  projectImage: cloudnaryRes
                        ? {
                              secure_url: cloudnaryRes.secure_url,
                              public_id: cloudnaryRes.public_id,
                        }
                        : undefined,
                  webSite: webSite || undefined,
                  githubLink: githubLink || undefined,
                  tags: addtags,
                  createdBy: req.user._id
            });

            if (!newPorject) {
                  return next(errorHandler(400, "New Project not found"));
            }

            await newPorject.save()

            res
                  .status(200)
                  .json(new ApiResponse(200, newPorject, "project is successfully created"));
      } catch (error) {
            return next(errorHandler(400, "Network error"));
      }


}

// public projects
export const getAllProjectsController = async (req, res, next) => {


      try {
            const sortDirection = req.query.order === 'asc' ? 1 : -1;
            const limit = parseInt(req.query.limit) || 6;

            const projects = await Project.find({ isPublic: true }).populate("createdBy", "username email profileImage").sort({ updatedAt: sortDirection }).limit(limit);

            res.status(200).json(new ApiResponse(201, projects, "List of Project"));
      } catch {
            next(errorHandler(403, 'allprojects error'))
      }
};


export const searchProjectsController = async (req, res, next) => {
      try {
            const { searchTerm, limit, order } = req.query;

            const sortDirection = order === 'asc' ? 1 : -1;
            const limitNumber = parseInt(limit) || 6;

            const searchQuery = searchTerm
                  ? {
                        $or: [
                              { title: { $regex: searchTerm, $options: "i" } },
                              { details: { $regex: searchTerm, $options: "i" } },
                              { tags: { $regex: searchTerm, $options: "i" } },
                              { category: { $regex: searchTerm, $options: "i" } },
                              { description: { $regex: searchTerm, $options: "i" } },

                        ],
                  }
                  : {}

            const projects = await Project.find({ ...searchQuery }).populate("createdBy", ["username", "email", "profileImage"]).sort({ updatedAt: sortDirection }).limit(limitNumber);

            res.status(200).json(new ApiResponse(201, projects, "List of Project"));

      } catch (error) {
            console.error("Error searching projects:", error)
            return next(errorHandler(500, "Failed to search projects"))
      }
}


// all projects only for admin
export const AllProjectsController = async (req, res, next) => {

      if (!req.user?.isAdminRole) {
            return next(errorHandler(403, 'Forbidden: Admin access only.'));
      }

      try {
            const projects = await Project.find().populate("createdBy", ["username", "email", "profileImage"]);

            res.status(200).json(new ApiResponse(201, projects, "List of Project"));
      } catch {
            return next(errorHandler(403, 'allprojects error'));
      }
};

//get singal project detail
export const getProjectsController = async (req, res) => {
      try {
            const project = await Project.findById(req.params.projectId).populate("createdBy", ["username", "email", "profileImage"]);


            if (!project) {
                  throw new Error("project not find")
            }

            res.status(200).json(new ApiResponse(201, project, "Project"));
      } catch {
            throw new Error("get Project error")
      }
};

//user projects
export const userProjectsController = async (req, res, next) => {
      try {

            const userId = req.params.userId

            const { limit, order } = req.query;

            const sortDirection = order === 'asc' ? 1 : -1;
            const limitNumber = parseInt(limit) || 6;

            const userProjects = await Project.find({ createdBy: userId }).sort({ updatedAt: sortDirection }).limit(limitNumber);

            res.status(200).json(new ApiResponse(200, userProjects, "List of Project"));
      } catch {
            next(errorHandler(403, 'user projects error'))
      }
};

export const updateProjectController = async (req, res) => {

      const { title, description, category, details, webSite, githubLink, tags } = req.body;

      const avaibleProject = await Project.findById(req.params.projectId);

      // console.log("project", project)

      if (avaibleProject.createdBy.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Unauthorized action" });

      const addtags = tags.split(",").map((tag) => tag.trim());

      const project = await Project.findByIdAndUpdate(
            req.params?.projectId,
            {
                  $set: {
                        title: title || avaibleProject.title,
                        description: description || avaibleProject.description, category: category || avaibleProject.category,
                        details: details || avaibleProject.details,
                        webSite: webSite || avaibleProject.webSite,
                        githubLink: githubLink || avaibleProject.githubLink,
                        tags: addtags || avaibleProject.tags
                  }
            },
            { new: true })



      res.status(200).
            json(new ApiResponse(201, project, "Project Update Successfully"))


}

export const updateProjectImageController = async (req, res, next) => {

      const projectImagePath = req.file?.path

      if (!projectImagePath) {
            return next(errorHandler(400, "project image required"))
      }
      const project = await Project.findById(req.params.projectId);


      if (!project) {
            throw new Error("project not find")
      }


      if (project.createdBy.toString() !== req.user._id.toString()) {
            return next(errorHandler(400, 'your not allowed to update this project'))
      }

      const newProjectImage = await uploadOnCloudinary(projectImagePath, "projectImage")

      if (!newProjectImage) {
            return next(errorHandler(400, 'cloudinary image upload error'))
      }

      const oldprojectimagepublic_id = project.projectImage?.public_id

      if (oldprojectimagepublic_id) {
            await deleteoldCloudinaryImage(oldprojectimagepublic_id);

      }



      const newproject = await Project.findByIdAndUpdate(
            req.params?.projectId,
            {
                  $set: {
                        projectImage: {
                              secure_url: newProjectImage.secure_url,
                              public_id: newProjectImage.public_id
                        },
                  }
            },
            { new: true })


      return res
            .status(200)
            .json(
                  new ApiResponse(200, newproject, "Cover image updated successfully")
            )
}


export const deleteProjectcontroller = async (req, res, next) => {
      try {
            const project = await Project.findById(req.params.projectId);

            // console.log("project", project)


            if (!project) {
                  return next(errorHandler(404, "project not found"))
            }

            if (!req.user.isAdminRole && project.createdBy.toString() !== req.user._id.toString()) {
                  return next(errorHandler(403, "Unauthorized action"))
            };

            try {
                  await deleteoldCloudinaryImage(project?.projectImage?.public_id)

            } catch (error) {
                  console.error("Error deleting project image:", error);
                  return next(errorHandler(500, "Failed to delete project image"))
            }

            await Project.deleteOne({ _id: project._id });

            res.status(201).
                  json(new ApiResponse(200, {}, "project is delete successfully"));
      } catch (error) {
            console.error("Error deleting project:", error)
            next(errorHandler(403, "Project delete error"));
      }
}

// like & unlike project by user
export const likeProjectcontroller = async (req, res) => {
      const getproject = await Project.findById(req.params.projectId)

      if (!getproject) {
            throw new Error("project not find")
      }

      if (getproject.totalLikes.includes(req.user._id)) {



            const project = await Project.findByIdAndUpdate(
                  req.params?.projectId,
                  {
                        $pull: {
                              totalLikes: req.user._id
                        }
                  },
                  { new: true }).populate("createdBy", ["username", "email", "profileImage"]).populate("totalLikes", ["username", "email", "profileImage"])



            return res.status(201).json(new ApiResponse(200, project, "project is liked successfully"))
      }

      const project = await Project.findByIdAndUpdate(
            req.params?.projectId,
            {
                  $addToSet: {
                        totalLikes: req.user._id
                  }
            },
            { new: true }).populate("createdBy", ["username", "email", "profileImage"]).populate("totalLikes", ["username", "email", "profileImage"])




      if (!project) {
            throw new Error("project not find")
      }

      res.status(200).json(new ApiResponse(201, project, "project is disLike successfully"))

}


// all liked projects by user
export const userLikdeProjectsController = async (req, res, next) => {

      try {
            const projects = await Project.find({ totalLikes: req.user._id }).populate("createdBy", ["username", "email", "profileImage"])

            res.status(200).json(new ApiResponse(201, projects, "list of user liked"));
      } catch {
            next(errorHandler(403, 'user liked projects error'))
      }
}


// all liked projects for admin
export const alLikedProjectsController = async (req, res, next) => {

      if (!req.user.isAdminRole) {
            return next(errorHandler(403, 'Forbidden: Admin access only.'))
      };

      try {
            const projects = await Project.find({ totalLikes: { $exists: true, $not: { $size: 0 } } }).populate("createdBy", ["username", "email", "profileImage"])

            res.status(200).json(new ApiResponse(201, projects, "list of all liked"));
      } catch {
            throw new Error("all like controller error")
      }
}

// ispublic project

export const isPublicProjectController = async (req, res, next) => {


      const project = await Project.findById(req.params.projectId)

      if (!project) {
            return next(errorHandler(404, "project not found"))
      }

      if (project.createdBy.toString() !== req.user._id.toString()) {
            return next(errorHandler(403, "Unauthorized"))
      }

      const isPublic = project.isPublic;



      try {

            const projectUpdate = await Project.findByIdAndUpdate(
                  req.params?.projectId,
                  {
                        $set: {
                              isPublic: !isPublic
                        }
                  },
                  { new: true }).populate("createdBy", ["username", "email", "profileImage"])


            const message = projectUpdate.isPublic
                  ? "Project is now public successfully everyboy can see this project"
                  : "Project is now private successfully only you can see this project";


            res.status(200).json(new ApiResponse(201, projectUpdate, message))
      } catch (error) {
            console.error("Error updating project:", error)
            return next(errorHandler(403, "project isPublic"))
      }
}