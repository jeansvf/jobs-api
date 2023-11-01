import mongoose, { Schema, model } from "mongoose"

const jobSchema = new Schema(
    {
        position: {
            type: String,
            required: [true, "Please provide job position"],
        },
        company: {
            type: String,
            required: [true, "Please company name"],
        },
        status: {
            type: String,
            enum: ["pending", "interview"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide job owner"],
        },
    },
    { timestamps: true }
)

const Job = model("Job", jobSchema)
export default Job
