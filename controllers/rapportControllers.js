//Model
const Rapport = require("../models/rapport");
const fs = require("fs");
const getRapports = (req, res) => {
  Rapport.find()
    .populate("consultant")
    .populate("client")
    .exec()
    .then((rapports) => res.json(rapports))
    .catch((err) => res.status(400).json(`get rapports failed ${err.message}`));
};

const getPageRapport = (req, res) => {
  res.json("rapport page!");
};

const postAddRapport = (req, res) => {
  console.log(req);
  let rapport = new Rapport(req.body);
  rapport
    .save()
    .then(() => res.json("rapport added"))
    .catch((err) =>
      res.status(400).json(`rapport adding failed ${err.message}`)
    );
};

const postAddRapportFile = (req, res) => {
  const imageData = fs.readFileSync(req.file.path);

  let rapport = new Rapport({ ...req.body, fichier: imageData });
  console.log(req.file);
  rapport
    .save()
    .then(() => res.json("rapport added"))
    .catch((err) =>
      res.status(400).json(`rapport adding failed ${err.message}`)
    );
};

const getRapportById = (req, res) => {
  let { id } = req.params;
  Rapport.findById(id)
    .populate("client")
    .populate("consultant")
    .exec()
    .then((rapport) =>
      rapport ? res.json(rapport) : res.json("rapport doesn't exist")
    )
    .catch((err) =>
      res.status(400).json(`get user by id failed ${err.message}`)
    );
};
const updateRapportById = (req, res) => {
  let { id } = req.params;

  Rapport.findByIdAndUpdate(id, req.body)
    .then(() => res.json(`rapport updated`))
    .catch((err) =>
      res.status(400).json(`rapport updating failed ${err.message}`)
    );
};
const deleteRapportById = (req, res) => {
  let { id } = req.params;

  Rapport.findByIdAndDelete(id)
    .then(() => res.json(`rapport deleted`))
    .catch((err) => res.status(400).json(`delete user failed ${err.message}`));
};

module.exports = {
  getRapports,
  getPageRapport,
  postAddRapport,
  getRapportById,
  updateRapportById,
  deleteRapportById,
};
