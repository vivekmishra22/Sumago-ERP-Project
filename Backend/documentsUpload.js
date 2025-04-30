// A middleware to handle multipart/ form-data, commonly used for file upload
const multer = require('multer')        
// Node.js module to handle and transforming file paths, it is also used to contruct file path in platform-independent manner
const path = require('path')            

// Setting up storage configuration for uploaded files 
const photoStorage = multer.diskStorage({

    // Define the destination directory for uploaded files( where uploaded files will be stored )
    destination: (req, file, cb) => {             
        // `cb` is a callback function used to set the destination( where files will be saved )

        // path.join is used to construct file paths in a platform-independent manner.
        cb(null, path.join(__dirname, './Documents_Image'));      // Saves/stores files inside the "Images" folder in the current directory
    },

    // Define the filename for uploaded files
    filename: (req, file, cb) => {
        
        // `null` indicates no error, and the second argument is the destination path
        // The original file name is used as the storage name
        cb(null, file.originalname);
    }
})

// Configure the `multer` middleware with the storage engine and file size limits
// Multer config for multiple fields
const photoUpload = multer({

    // Setting the storage engine defined above
    storage: photoStorage,
    limits: { fileSize: 10 * 1024 * 1024 },       // Limiting the file size to 5GB (5 * 1024 * 1024 * 1024 bytes)
}).fields([                 
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'graduationMarksheet', maxCount: 1 },
    { name: 'postGraduationMarksheet', maxCount: 1 }
]);                              //single('image');,  Accepts a **single** file with the field name "image"

// Export the `photoUpload` middleware to be used in other parts of the application
module.exports = { photoUpload };