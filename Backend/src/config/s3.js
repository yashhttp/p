
import dotenv from "dotenv";
dotenv.config();

import { S3Client } from "@aws-sdk/client-s3";


// if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
//   throw new Error("❌ AWS credentials missing in .env");
// }
console.log({
  key: process.env.AWS_ACCESS_KEY_ID,
  keyLen: process.env.AWS_ACCESS_KEY_ID?.length,
  secretLen: process.env.AWS_SECRET_ACCESS_KEY?.length,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET_NAME,
});
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    
    accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim(),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim(),
  },
 

});