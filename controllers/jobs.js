const getAllJobs = async (req, res) => {
  return res.status(200).send("get all jobs");
};
const getJob = async (req, res) => {
  return res.status(200).send("get a job");
};
const createJob = async (req, res) => {
  return res.status(200).json({ ...req.user });
};

const updateJob = async (req, res) => {
  return res.status(200).send("update a job");
};

const deleteJob = async (req, res) => {
  return res.status(200).send("delete a job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
