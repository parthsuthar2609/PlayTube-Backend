import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({       //This is From Cloudanry Server Code
    cloud_name: 'dngl3xm7n',
    api_key: '888525554687822',
    api_secret: 'OpJueeiqNlbOwezVDcxx5c52w1I'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload On The Cloudinary Server
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        //File has been Uploaded Successfully;
        console.log("File has been Uploaded Sucessfully",
            response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
        return "Error while uploading file on the Cloudinary Server";
    }
}

export {uploadOnCloudinary};