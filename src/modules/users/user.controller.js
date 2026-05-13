import { Router } from "express";
import * as US from "./user.service.js";
import * as UV from "./user.validation.js"; 
import { validation } from "../../common/middleware/validation.js";
import { multer_local } from "../../common/middleware/multer.js";
import { multerEnum } from "../../common/enum/multer.enum.js";
import { authentication } from "../../common/middleware/authentication.js";

const userRouter = Router({ mergeParams: true });

userRouter.post("/signup", 
    multer_local({ custom_types: [...multerEnum.image] }).fields([{ name: "attachments", maxCount: 5 }]),
    validation(UV.signUpSchema), 
    US.signUp 
);


userRouter.post("/signin", validation(UV.signInSchema), US.signIn);


userRouter.post("/forgot-password", US.forgetPassword);
userRouter.patch("/reset-password/:token", US.resetPassword);

 
userRouter.get("/profile", authentication, US.getProfile);




userRouter.patch("/enable-2fa", authentication, US.enable2FA);
userRouter.patch("/confirm-2fa", authentication, US.confirm2FA);


userRouter.patch("/confirm-email", US.confirmEmailOtp);
export default userRouter;