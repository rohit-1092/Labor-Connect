import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const DB_URL = process.env.MONGO_URL;

const dbConnect = async () => {
    if (!DB_URL) {
        console.error("❌ MONGO_URL is missing from .env file");
        process.exit(1);
    }

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Database connected successfully");

        mongoose.connection.on("disconnected", () => {
            console.error("⚠️ Database lost connection");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("🔄 Database reconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ Database error:", err);
        });

    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default dbConnect;
