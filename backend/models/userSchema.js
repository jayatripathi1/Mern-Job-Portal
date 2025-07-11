import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
        minlength: [3, "Name must contain at least 3 characters!"],
        maxlength: [30, "Name cannot exceed 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone: {
        type: String,  // Changed to String for leading zeros and special characters
        required: [true, "Please provide your phone number."],
    },
    password: {
        type: String,
        required: [true, "Please provide your password!"],
        minlength: [8, "Password must contain at least 8 characters!"],
        maxlength: [32, "Password cannot exceed 32 characters!"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide your role!"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hashing the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Comparing password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a JWT token
userSchema.methods.getJWTToken =  function () {
    return jwt.sign({ id: this._id },process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);

