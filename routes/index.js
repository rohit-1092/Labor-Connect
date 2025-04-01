import express from "express";
import user from "./user.js";
import laborsType from "./laborsType.js";
import gig from "./gig.js";
import conversation from "./conversation.js";
import message from "./message.js";
import project from "./project.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "✅ API is working!" });
});

router.use("/user", user);  // Changed from /users to /user to match your routes
router.use("/laborsType", laborsType);
router.use("/gigs", gig);
router.use("/conversations", conversation);
router.use("/messages", message);
router.use("/projects", project);

export default router;