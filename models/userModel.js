const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
            minLength: [3, "name must be at least 3 characters"],
            maxLength: [32, "name is too large"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password must be at least 6 characters"],
        },
        passwordChangedAt: {
            type: Date
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    // hash password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema)