// models/User.js
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import roles from "../utils/role.js";  // Import predefined roles

dotenv.config();
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'can\'t be blank'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'can\'t be blank'],
        index:true,
        match: [/^[a-z\d!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/, 'is invalid']
    },
  image: { type: String, default: 'https://i.ibb.co/3F3XMQR/profile-img.png' },
  role: { 
    type: String, 
    required: [true, "Role is required"], 
    enum: roles  // Uses roles defined in utils/role.js
  },
  name: { type: String },
  age: { type: Number },
  CNIC: { type: String },
  type: { type: String },
  area: { type: String },
  state: { type: String },
  city: { type: String },
  phone: { type: String },
  rating: { type: Number },
  linkedin: { type: String },
  status: { type: String },
  startingWage: { type: Number },
  profileCompleted: { type: Boolean },
  paymentMethod: { type: String },
  cardName: { type: String },
  cardNumber: { type: String },
  cardExpiry: { type: String },
  cvv: { type: String },
  mobAccName: { type: String },
  mobAccNumber: { type: String },
  gigs: [{ type: mongoose.Schema.Types.ObjectId, ref: "gigs" }],
  conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: "conversations" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  hash: String,
  salt: String
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

// Methods for password and JWT
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
  if (!this.salt || !this.hash) return false;
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

userSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    username: this.username,
    token: this.generateJWT(),
    email: this.email,
    image: this.image,
    role: this.role
  };
};

// Add this line before the export
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
