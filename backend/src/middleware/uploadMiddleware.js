const multer = require("multer")

const storage = multer.memoryStorage();

// const allowedMimeTypes = [
//   "image/jpeg",
//   "image/png",
//   "image/webp",
//   "image/jpg",
// ];

// const fileFilter = (req, file, cb) => {
//   if (!allowedMimeTypes.includes(file.mimetype)) {
//     return cb(
//       new Error(
//         "Only JPG, JPEG, PNG and WEBP images are allowed."
//       ),
//       false
//     );
//   }

//   cb(null, true);
// };

const upload = multer({
  storage,

  limits: {
    fileSize:
      Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,  //file upto 5 mb
  },

  
});

module.exports = upload