import jwt from "jsonwebtoken";
import User from "../models/User.js";  // ✅ Correct Import

export default {
  authenticate(req, res, next) {
    const secretKey = process.env.SECRET_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log("Token not found");
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    jwt.verify(token, secretKey, async (err, decodedUser) => {
      if (err) {
        console.log("Token not valid");
        return res.status(401).json({ message: 'Unauthenticated' });
      }

      try {
        // Fetch user from DB
        const user = await User.findById(decodedUser.id).populate("gigs", "-__v");

        if (!user) {
          console.log("User does not exist for this token");
          return res.status(401).json({ message: 'Unauthenticated' });
        }

        req.user = user;
        next();
      } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  },

  authorize(roles = []) {
    return [
      (req, res, next) => {
        if (typeof roles === 'string') {
          roles = [roles];
        }
        if (roles.length && !roles.includes(req.user.role)) {
          console.log("User's role is not authorized");
          return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
      },
    ];
  },
};
