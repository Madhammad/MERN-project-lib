import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath, folderName) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });

    fs.unlinkSync(filePath);

    return response;
  } catch (error) {
    fs.unlinkSync(filePath);

    return null;
  }
};

const deleteoldCloudinaryImage = async (imagePublicId) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!imagePublicId) return null;

  await cloudinary.uploader.destroy(imagePublicId)
  return
}

export { uploadOnCloudinary, deleteoldCloudinaryImage };
