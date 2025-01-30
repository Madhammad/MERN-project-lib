import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyJWT = async (req, res, next) => {

    const token = req.headers["authorization"]

    if (!token) {
        return next(errorHandler(400, 'Authorization header is missing'));
    }

    const bearerToken = token.split(' ')[1]

    // console.log(bearerToken)

    if (!bearerToken) {
        return  next(errorHandler(400, 'Token is not avaible'));
    }


    const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);


    if (!decoded) {
        return  next(errorHandler(400, 'Decoded User not find'))
    }

    // console.log("decoded", decoded)

    const user = await User.findById(decoded._id);

    // console.log("user", user._id)

    req.user = user
    next();



}


export const IsAdmin = (req, _, next) => {

    if (!req.user.isAdminRole) {
        return next(errorHandler(403, 'Forbidden: Admin access only.'));
    }

    next();
};