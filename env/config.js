import dotenv from "dotenv";

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    googlePassword: process.env.GOOGLE_PASSWORD,
    googleEmail: process.env.GOOGLE_EMAIL
}