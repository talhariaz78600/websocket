// const AWS = require("aws-sdk");
// const multer = require('multer');
// const multerS3 = require("multer-s3");
// const bucketName = process.env.bucket_Name
// // Check if AWS credentials are set
// if (!process.env.access_Key_Id || !process.env.secret_Access_Key || !process.env.Region) {
//     throw new Error('AWS credentials are not set properly.');
// }
// AWS.config.update({
//     accessKeyId: process.env.access_Key_Id,
//     secretAccessKey: process.env.secret_Access_Key,
//     region: process.env.Region,
// });

// const s3 = new AWS.S3(); // Create the S3 client correctly


// const upload = (folderName) => multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: bucketName,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,

//         key: function (req, file, cb) {
//             const currentDate = new Date().toISOString().replace(/:/g, '-');
//             const currentTimeInSeconds = Math.floor(Date.now() / 1000);
//             let { userId } = req.params
//             let objectKey = `${folderName}/${currentDate}-${currentTimeInSeconds}-${file.originalname}`

//             if (userId) {
//                 objectKey = `${folderName}/${userId}/${currentDate}-${currentTimeInSeconds}-${file.originalname}`
//             }

//             cb(null, objectKey)
//         }
//     })

// })

// const mediaDeleteS3 = async function (filename) {
//     var params = {
//         Bucket: bucketName,
//         Key: filename,
//     };

//     try {
//         const data = await s3.deleteObject(params).promise();
//         console.log("File deleted:", data);
//     } catch (err) {
//         console.error("Error deleting file:", err);
//         throw err; // Re-throw the error to handle it in the caller function
//     }
// };
// // const mediaDeleteS3 = async  function (filename, callback) {
// //     // var s3 = new AWS.S3();
// //     var params = {
// //         Bucket: bucketName,
// //         Key: filename,
// //     };

// //     s3.deleteObject(params, function (err, data) {
// //         if (data) {
// //             console.log("file deleted", data);
// //         } else {
// //             console.log("err in delete object", err);
// //             // callback(null);
// //         }
// //     });
// // };

// // Multer configuration for handling file uploads
// const upload = multer({ dest: 'uploads/' });

// // AWS S3 configuration
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// app.post('/videos', upload.single('video'), async (req, res) => {
//   try {
//     // Upload the video file to AWS S3
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `videos/${req.file.originalname}`,
//       Body: req.file.buffer,
//     };

//     const uploadResult = await s3.upload(params).promise();

//     // Save the video URL to MongoDB
//     const newVideo = new Video({ url: uploadResult.Location });
//     await newVideo.save();

//     res.status(201).json({ message: 'Video uploaded successfully', url: uploadResult.Location });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to upload video', error: error.message });
//   }
// });



// const AWS = require("aws-sdk");
// const multer = require('multer');
// const multerS3 = require("multer-s3");
// const bucketName = process.env.bucket_Name
// const { S3 } = require("@aws-sdk/client-s3");

// const s3Client = new S3({
//     region: process.env.Region,
//     credentials: {
//         accessKeyId: process.env.access_Key_Id,
//         secretAccessKey: process.env.secret_Access_Key,
//     },
// });

// const upload = (folderName) =>
//     // console.log("enter hva multer")
//     multer({
//         storage: multerS3({
//             s3: s3Client,
//             bucket: bucketName,
//             acl: "public-read",
//             contentType: multerS3.AUTO_CONTENT_TYPE,

//             key: async (req, file, cb) => {
//                 const currentDate = new Date().toISOString().replace(/:/g, "-");
//                 const currentTimeInSeconds = Math.floor(Date.now() / 1000);
//                 const userId = req.params?.userId; // Use optional chaining

//                 const objectKey = userId
//                     ? `${folderName}/${userId}/${currentDate}-${currentTimeInSeconds}-${file.originalname}`
//                     : `${folderName}/${currentDate}-${currentTimeInSeconds}-${file.originalname}`;

//                 // await uploadObject(objectKey, file); // Upload directly, removing callback

//                 cb(null, objectKey);
//             },
//         }),
//     });

// async function uploadObject(objectKey, file) {
//     try {
//         const uploadParams = {
//             Bucket: bucketName,
//             Key: objectKey,
//             Body: file.stream,
//             ContentType: file.mimetype,
//         };

//         const uploadResult = await s3Client.upload(uploadParams);
//         console.log("File uploaded successfully:", uploadResult.Location);
//     } catch (err) {
//         console.error("Error uploading file:", err);
//         throw err; // Re-throw the error for handling
//     }
// }
// const mediaDeleteS3 = async function (filename) {
//     const params = {
//         Bucket: bucketName,
//         Key: filename,
//     };

//     try {
//         const deleteResult = await s3Client.deleteObject(params);
//         console.log("File deleted successfully:", deleteResult);
//     } catch (err) {
//         console.error("Error deleting file:", err);
//         throw err; // Re-throw the error for handling
//     }
// };


// module.exports = { upload, mediaDeleteS3 };