import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // check if this request contains token or not, if not means this request is not from an authenticated user
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"));


    // if token exist, we have to check the user id inside this token
    // if verified, will return err else payload | payload conatains the information which was encoded during the token creation at the time of login
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {                             // verifies the authenticity of the jwt by decoding it with the secret key
        if (err) return next(createError(403, "Token is not valid."));

        // This information can then be used in subsequent middleware or route handlers to identify and authorize the user.
        req.userId = payload.id;       
        req.isSeller = payload.isSeller;
        next();            // The next() function in Express is used to pass control to the next middleware function or route handler in the middleware stack.
    });
}

// now we can use this middleware everywhere