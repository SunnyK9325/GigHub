import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {        // async because we gonna make operations using our database
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,         // spread operator
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been registered!");
    } catch (err) {
        // If there is an error, pass it to the next middleware
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong password or username!"));

        // creating jwt 
        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY
        );

        const { password, ...info } = user._doc;

        // sending cookie along with user information
        res.cookie("accessToken", token, { httpOnly: true, }).status(200).send(info);
    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res) => {
    // clearing out cookie from the browser
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .send("User has been logged out.");
}