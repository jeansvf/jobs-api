import { connect } from "mongoose"

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log("failed on connecting to mongodb, ", err)
    }
}

export default connectDB
