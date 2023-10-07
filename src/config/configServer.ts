// Import librarys
import { app } from './lib';
import { initModels } from '../models/init-models';
import sequelize from '../models/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';

// Config BodyParser
app.use(bodyParser.json());

// Config PORT
dotenv.config();
const PORT = process.env.PORT || 4000;

// Config for Upload File
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    // Giới hạn kích thước tối đa cho một file upload
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        // Chỉ cho phép upload file định dạng .jpeg hoặc .png
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only accept file .jpeg or .png'));
        }
    }
})

// Config Sequelize
const model = initModels(sequelize);

const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const sercetAccessKey = process.env.SECRET_ACCESS_KEY

// Config AWS S3
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: sercetAccessKey
    },
    region: bucketRegion
})

export { PORT, model, upload, s3 };