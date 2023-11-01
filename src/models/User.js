import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide user name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
})

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

const User = model("User", userSchema)
export default User
