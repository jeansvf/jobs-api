import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "invalid token" })
    }

    try {
        const jwtVerify = jwt.verify(
            authorization.split(" ")[1],
            process.env.JWT_SECRET
        )

        req.user = { userId: jwtVerify.userId }
        next()
    } catch (err) {
        return res.status(401).json({ message: "invalid token" })
    }
}

export default authentication
