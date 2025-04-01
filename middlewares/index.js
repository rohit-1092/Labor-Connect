import { errorHandler } from "./errorHandler.js"; // ✅ Named export fix
import authorize from "./auth.js";
import express from "express";
const app = express();

app.use(express.json());

export default {
  errorHandler,
  authorize,
};
