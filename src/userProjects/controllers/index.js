const Project = require("../models/projectsModel");

exports.listUserProject = async (req, res) => {
  const results = await Project.get();
  res.status(200).send({ data: results });
};

exports.getUserProject = async (req, res) => {
  const results = await Project.getById(req.params.projectId);
  res.render("codeeditor",{project: results});
};

exports.createUserProject = async (req, res) => {
  const results = await Project.create(req.body);
  res.status(200).send({ data: results });
};