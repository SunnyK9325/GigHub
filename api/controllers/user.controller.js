import User from "../models/user.model.js"
import createError from "../utils/createError.js";

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(createError(404, "User not found!"));
    }

    res.status(200).send(user);
}

export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // we assigned payload.id to request
    if (req.userId !== user._id.toString()) {             // in the database id stored as object id not as string
        return next(createError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted.");
}