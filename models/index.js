import mongoose from "mongoose";
import User from './user.js';
import Token from './token.js';
import Message from './message.js';
import Conversation from './conversation.js';
import Project from './project.js';
import Gig from './gig.js';
import LaborsType from './LaborsType.js';

// Ensure mongoose is configured
mongoose.set("strictQuery", false);

export {
    User,
    Token,
    Message,
    Conversation,
    Project,
    Gig,
    LaborsType
};