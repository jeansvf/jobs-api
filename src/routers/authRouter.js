import { Router } from "express"
import { login, register } from "../controllers/auth.js"

const authRouter = new Router()

authRouter.route("/login").post(login)
authRouter.route("/register").post(register)

export default authRouter
