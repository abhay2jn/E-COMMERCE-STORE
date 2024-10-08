import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async(req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(404);
            throw new Error("Not authorized, token not found.")
        }
    } else {
        res.status(404);
        throw new Error("Authorization failed, token not found");
    }
})

const authorizedAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(404).send("Not authorized as an admin")
    }
}

export {authenticate, authorizedAdmin};