import { User } from "../models/User.js";
import JWT from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(403).json({ error: "User not found" });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(403).json({ error: "Password is incorrect" });

        const token = JWT.sign({ id: user._id, email: user.email}, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.json({token });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }
};

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email: email, password: password });
        await user.save();
        //JWT
        return res.json({ message: "usuario registrado correctamente!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
    }
    return res.status(500).json({ error: "Something went wrong" });
};
