import multer from "multer";
import { __dirname } from "../utils.js";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, __dirname + "/public/images")
    },
    filename: function (req, res, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + uniqueSuffix)
    }
})

export const uploader = multer({storage: storage}).array('file');