import express from "express";
import userController from "../controllers/index.js";
import auth from "../middlewares/auth.js";
import { User } from '../models/index.js';


const { Router } = express;
const { user } = userController;

const api = Router();

// Check email availability
api.post('/check-email', user.checkEmail);

// User login
api.post('/login', user.login);

// Get all users (only accessible by ADMIN)
api.get('/', auth.authenticate, auth.authorize('ADMIN'), user.all);

// Create user (Signup function)
api.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Create new user
        const newUser = new User({
            username,
            email,
            role,
            image: 'https://i.ibb.co/3F3XMQR/profile-img.png'
        });
        
        // Set password using the model's method
        newUser.setPassword(password);
        
        // Save the user
        await newUser.save();
        
        // Generate auth JSON response
        const authJSON = newUser.toAuthJSON();
        res.status(201).json(authJSON);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single user against given username
api.get('/one/:username', auth.authenticate, user.one);

// Get user by token
api.get('/getByToken', auth.authenticate, user.getByToken);

// Update a single user against given ID
api.put('/', auth.authenticate, user.update);

// Delete a single user against given ID (only accessible by ADMIN)
api.delete('/:id', auth.authenticate, auth.authorize('ADMIN'), user.delete);

// Get users by role
api.get('/getUserByRole/', user.getUsersByRole);

// Verify email
api.get('/verification/:id/verify/:token', user.verifyEmail);

export default api;