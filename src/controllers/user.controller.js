import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/FileUpload.js";



const registerUser = asyncHandler(async (req, res) => {
    //Full Logic Related With Backend And Registration Of User From Front And Validate It.

    const { fullName, email, username, password } = req.body
    console.log("email:", email);

    if (
        [fullName, email, username, password].some((field) =>      //field is Refference Variable
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields Are Required");
    }

    const existedUser = User.findOne({           //Check Whether The User Name Is Already Exists Or Not With Operators
        $or: [{ username }, { password }]
    })

    if (existedUser) {
        throw new ApiError(409, "UserName And Email already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is Required");
    }

    if (!coverImageLocalPath) {
        throw new ApiError(400, "CoverImage is Required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    if (!avatar) {
        throw new ApiError(400, "Avatar is Required");
    }
 
   const user  =  User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.uri || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "SomeThing Went Wrong while register the User");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully"));


})

export default registerUser;