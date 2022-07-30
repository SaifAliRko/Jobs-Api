const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId }); // get a job of logged in user with that job id
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  return res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Position or company name could not be empty");
  }
  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  return res.status(StatusCodes.OK).send('Deleted Successfuly');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
