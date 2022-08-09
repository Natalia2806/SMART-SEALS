import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)

    } catch (error) {
        console.log(error)
        throw new Error("error")
    }
})

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcryptjs.compare(password, user.password)
}

export const User = mongoose.model('User', userSchema);
