import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config.js"

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!email || !password) {
        return res.status(400).json({ message: "missing email and password" })
    }
    if (!user) {
        return res.status(401).json({ message: "invalid credentials" })
    }

    const comparison = await bcrypt.compare(password, user.password)

    if (!comparison) {
        return res.status(401).json({ message: "incorrect password" })
    }

    let token = jwt.sign(
        { name: user.name, userId: user._id },
        process.env.JWT_SECRET
    )
    return res.status(200).json({ token })
}

export const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })
        const token = jwt.sign(
            { name, userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRATION,
            }
        )

        res.status(201).json({ token })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "registration failed" })
    }
}
