import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
   node_env: process.env.NODE_ENV,
   port: process.env.PORT,
   database_url: process.env.DATABASE_URL,
   default_password: process.env.DEFAULT_PASS,
   bcrypt_salt: process.env.BCRYPT_SALT_ROUNDS,
   jwt_access_secret: process.env.JWT_ACCESS_SECRET,
   jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
   jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
   jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
   reset_pass_link: process.env.RESET_PASS_LINK,
   email: process.env.EMAIL,
   email_password: process.env.EMAIL_PASSWORD,
   cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
   cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
