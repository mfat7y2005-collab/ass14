import { VerifyToken } from "../utils/token.service.js";
import userModel from "../../DB/models/user.model.js";
import { PREFIX, ACCESS_SECRET_KEY } from "../../../config/config.service.js";
import { get, revoked_key } from "../../DB/redis/redis.service.js";
export const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new Error("Token is required 😈", { cause: 400 }));
        }
        const [authPrefix, token] = authorization.split(" ");
        if (authPrefix !== PREFIX) {
            return next(new Error("Invalid token prefix 😈", { cause: 400 }));
        }
        const decoded = VerifyToken({
            token,
            secret_key: ACCESS_SECRET_KEY || "Mohamed", 
        });

        if (!decoded || !decoded?.id) {
            return next(new Error("Invalid token 😈", { cause: 400 }));
        }

        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return next(new Error(" not found in database 😈", { cause: 404 }));
        }

        
        if (user?.changeCredential?.getTime() / 1000 > decoded.iat) {
            return next(new Error("Token expired due to credential change", { cause: 401 }));
        }

        const isRevoked = await get(
            revoked_key({ userId: decoded.id, jti: decoded.jti })
        ).catch(() => null);

        if (isRevoked) {
            return next(new Error("Token revoked 😈", { cause: 401 }));
        }

       
        req.user = user;
        req.decoded = decoded;
        next();
    } catch (error) {
        return next(new Error(error.message, { cause: 500 }));
    }
};