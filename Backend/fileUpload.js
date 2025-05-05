const multer = require('multer')
const path = require('path')

const photoStorage = multer.diskStorage({
    destination : ( req, file, cb) => {
        cb(null,path.join(__dirname,'./Images'))
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const photoUpload = multer({
    storage:photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 *1024 },
}).single('image');

module.exports = {photoUpload}