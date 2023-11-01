import { Router } from "express"
import {
    createJob,
    deleteJob,
    getAllJobs,
    getJob,
    updateJob,
} from "../controllers/jobs.js"

const jobsRouter = new Router()

jobsRouter.route("/").get(getAllJobs).post(createJob)
jobsRouter.route("/:id").get(getJob).delete(deleteJob).put(updateJob)

export default jobsRouter
