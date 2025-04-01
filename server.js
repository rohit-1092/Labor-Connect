import 'dotenv/config';
import express from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";
import passport from "passport";
import "./utils/passport.js";  // Add this line
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dbConnect from "./utils/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.server = http.createServer(app);


// Middleware
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    credentials: true
  }));
app.use(bodyParser.json({ limit: process.env.BODY_LIMIT || "100kb" }));
app.use(express.json());
app.use(passport.initialize());  // Add this line

if (process.env.NODE_ENV === "development") {
    morganBody(app);
}

// Connect to MongoDB
(async () => {
    try {
        await dbConnect();
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    }
})();

// API Routes
app.use("/api", routes);

console.log("✅ API Routes mounted at /api");

if (process.env.NODE_ENV === "production") {
    const clientPath = path.resolve("client", "build");
    app.use(express.static(clientPath));
    app.get("*", (req, res) => res.sendFile(path.join(clientPath, "index.html")));
}

app.use(errorHandler);

app.server.listen(PORT, () => {
    console.log(`🚀 Server started on ${BASE_URL}`);
});

export default app;