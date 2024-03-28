import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(     //For Validation Of The Multer Upload File From user
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
    );

export default router;