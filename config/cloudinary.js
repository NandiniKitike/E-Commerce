// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config();

// const connectCloudinary = async () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// };

// export async function POST(req) {
//   try {
//     const data = await req.formData();
//     const file = data.get("file");

//     if (!file) {
//       return res.status(400).json({ message: "Required files are missing" });
//     }

//     // Convert file to base64
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileStr = `data:${file.type};base64,${buffer.toString("base64")}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(fileStr, {
//       folder: "products",
//     });

//     return res.status(400).json({ url: result.secure_url });
//   } catch (error) {
//     console.error("Error in createProduct:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

// module.exports = connectCloudinary;
