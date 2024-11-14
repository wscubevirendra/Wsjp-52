const mongoose = require("mongoose");


// Define Admin Schema
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        contact: {
            type: String,
            required: [true, "Number is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        role: {
            type: Boolean,
            default: 0,
            //0 -admin 1-superadmin
        }
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);



// Create Admin Model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
