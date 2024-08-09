import bcrypt from "bcryptjs"
import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        throw new Error("Fill all the input field")
    }
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(444).send("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(202).json({_id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
})
export { createUser };