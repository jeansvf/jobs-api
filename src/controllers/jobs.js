import Job from "../models/Job.js"

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })

    res.status(200).json({ jobs: jobs })
}

export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findOne({
        _id: id,
        createdBy: req.user.userId,
    })

    if (!job) {
        return res.status(404).json({ message: "job not found" })
    }

    res.status(200).json({ job })
}

export const createJob = async (req, res) => {
    const { position, company, status } = req.body
    const job = await Job.create({
        position,
        company,
        status,
        createdBy: req.user.userId,
    })

    res.status(200).json({ job })
}

export const deleteJob = async (req, res) => {
    const { id } = req.params

    const jobToDelete = await Job.findOne({ _id: id })

    if (!jobToDelete) {
        return res.status(404).json({ message: "job not found" })
    }

    if (jobToDelete.createdBy.toString() !== req.user.userId) {
        return res.status(401).json({ message: "job can't be deleted" })
    }

    await Job.deleteOne({ _id: id })

    res.status(200).json({
        job: jobToDelete,
    })
}

export const updateJob = async (req, res) => {
    const { id } = req.params
    const updatedJob = await Job.updateOne(
        { _id: id, createdBy: req.user.userId },
        req.body
    )

    if (!updatedJob) {
        return res.status(404).json({ message: "job not found" })
    }

    res.status(200).json({ job: updatedJob })
}
