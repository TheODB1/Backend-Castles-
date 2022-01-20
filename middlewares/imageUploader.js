import { resolve, extname } from 'path';
import multer, { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk/global.js';
import S3 from 'aws-sdk/clients/s3.js';
import { v4 as uuidv4 } from 'uuid';

let storage;

if (process.env.AWS_BUCKET) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  const s3 = new S3();
  storage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => {
      const key = `${file.fieldname}-${uuidv4()}${extname(file.originalname)}`;
      cb(null, key);
    }
  });
} else {
  const uploadFolder = resolve('public', 'uploads');
  storage = diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${uuidv4()}${extname(file.originalname)}`);
    }
  });
}

const isPicture = ({ originalname, mimetype }) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  return (
    allowedTypes.includes(mimetype) && originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
  );
};

const fileFilter = (req, file, cb) => {
  if (!isPicture(file)) {
    return cb(new Error('File not allowed'));
  }
  return cb(null, true);
};

const imageUploader = multer({ storage, fileFilter });

export default imageUploader;