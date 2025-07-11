import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        minlength: [3, "Job title must contain at least 3 characters!"],
        maxlength: [50, "Job title cannot exceed 50 characters!"],
    },
    description: {  // Fixed typo here
        type: String,
        required: [true, "Please provide job description"],
        minlength: [50, "Job description must contain at least 50 characters!"],  // Fixed min length
        maxlength: [350, "Job description cannot exceed 350 characters!"],
    },
    category: {
        type: String,
        required: [true, "Job category is required!"]
    },
    country: {
        type: String,
        required: [true, "Job country is required!"]
    },
    city: {
        type: String,
        required: [true, "Job city is required!"]
    },
    location: {
        type: String,
        required: [true, "Please provide exact location!"],
        minlength: [10, "Job location must contain at least 10 characters!"],  // Fixed min length
    },
    fixedSalary: {
        type: Number,
        min: [1000, "Fixed salary must be at least 4 digits!"],  // Changed minlength to min
        max: [999999999, "Fixed salary cannot exceed 9 digits!"],  // Changed maxlength to max
    },
    salaryFrom: {
        type: Number,
        min: [1000, "SalaryFrom must be at least 4 digits!"],  // Changed minlength to min
        max: [999999999, "SalaryFrom cannot exceed 9 digits!"],  // Changed maxlength to max
    },
    salaryTo: {
        type: Number,
        min: [1000, "SalaryTo must be at least 4 digits!"],  // Changed minlength to min
        max: [999999999, "SalaryTo cannot exceed 9 digits!"],  // Changed maxlength to max
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);
