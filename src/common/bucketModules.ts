import { s3 } from '../config/configServer';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from 'sharp';

const bucketName = process.env.BUCKET_NAME;

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    // Resize Image
    const newBuffer = await sharp(file.buffer).resize({
        height: 1024, width: 768 , fit: 'contain'
    }).toBuffer()

    const imageName = Date.now() + '-' + file.originalname;

    // Config Command for S3
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: imageName,
        Body: newBuffer,
        ContentType: file.mimetype
    })

    await s3.send(command)

    return imageName;
}

const getImage = async (imageName: string, expiresTime: number = 3600): Promise<string> => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageName
    });

    return await getSignedUrl(s3, command, { expiresIn: expiresTime });
}

const delImage = async (imageName: string): Promise<void> => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: imageName
    })
    await s3.send(command);
}

export { uploadImage, getImage, delImage };