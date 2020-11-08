const Project = require("../models/projectsModel");

exports.listUserProject = async (req, res) => {
  const results = await Project.getByUserId(req.params.userId);//userid
  res.status(200).send({ data: results });
};

exports.getUserProject = async (req, res) => {
  const results = await Project.getById(req.params.projectId);
  res.status(200).send({project: results});
};

exports.createUserProject = async (req, res) => {
  // eslint-disable-next-line
  const results = await Project.create(Object.assign({ owner_id: req.params.userId }, req.body));
  res.status(200).send({ data: results[0] });
};


exports.updateUserProject = async (req, res) => {
  const results = await Project.update(req.params.projectId, req.body);
  res.status(200).send({ data: results });
};
