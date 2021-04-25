// model
const Client = require("../models/client");

const getClients = (req, res) => {
  Client.find()
    .then((client) => res.json(client))
    .catch((err) => res.status(400).json(`get user failed ${err.message}`));
};

const getPageClient = (req, res) => {
  res.json("client page");
};

const postAddClient = (req, res) => {
  let client = new Client(req.body);

  client
    .save()
    .then(() => res.json("client added!"))
    .catch((err) => res.status(400).json(`client user failed ${err.message}`));
};

const getClientById = (req, res) => {
  let { id } = req.params;

  Client.findById(id)
    .then((client) =>
      client ? res.json(client) : res.json("client doesn't exist")
    )
    .catch((err) => res.status(400).json(`add user failed ${err.message}`));
};

const updateClientById = (req, res) => {
  let { id } = req.params;

  Client.findByIdAndUpdate(id, req.body, { new: true })
    .then(() => res.json(`client updated`))
    .catch((err) =>
      res.status(400).json(`client update it failed ${err.message}`)
    );
};

const deleteClientById = (req, res) => {
  let { id } = req.params;

  Client.findByIdAndDelete(id)
    .then(() => res.json(`client deleted`))
    .catch((err) => res.status(400).json(`client user failed ${err.message}`));
};

module.exports = {
  getClients,
  getPageClient,
  postAddClient,
  getClientById,
  updateClientById,
  deleteClientById,
};
