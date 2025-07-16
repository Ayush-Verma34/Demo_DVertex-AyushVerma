const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60
        })

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
        });
        res.status(200).json({ message: 'LogOut Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
    }
});


module.exports = router;
