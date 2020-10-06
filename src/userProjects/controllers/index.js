const Project = require("../models/projectsModel");

exports.listUserProject = async (req, res) => {
  const results = await Project.get();
  res.status(200).send({ data: results });
};

exports.getUserProject = async (req, res) => {
  const results = await Project.getById(req.params.projectId);
  res.render("codeeditor",{project: results, userId : req.user.validUser._id});
};

exports.createUserProject = async (req, res) => {
  const results = await Project.create(req.body);
  res.redirect("/profile");
  // res.status(200).send({ data: results });
};


exports.updateUserProject = async (req, res) => {
  const results = await Project.update(req.params.projectId, req.body);
  res.status(200).send({ data: results });
};
