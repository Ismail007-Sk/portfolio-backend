import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: '', 
        api_key: '', 
        api_secret: '' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           "C:\\Users\\Desktop\\PROJECT_VS\\PORTFOLIO\\express-backend\\uploads\\test.jpg", {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();





// import os from "os";
// import cloudinary from "./config/cloudinary.js";


// const path = `C:/Users/Desktop/OneDrive/Desktop/MYdata/ISMAIL SK_CSE(AIML)_2026.pdf`;

// try {
//   const pdf = await cloudinary.uploader.upload(path, {
//     folder: "cloudinary-node-upload-pdf-demo",
//     use_filename: true,
//     unique_filename: false,
//     resource_type: "raw",
//   });

//   console.log("Upload successful!");
//   console.log("URL:", pdf.secure_url);
//   console.log("Public ID:", pdf.public_id);
// } catch (error) {
//   console.error("Upload failed:", error);
// }


