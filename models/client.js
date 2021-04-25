const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clientSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      minLength: 3,
    },
    prenom: {
      type: String,
      required: true,
      minLength: 3,
    },
    adresse: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
      minLength: 8,
    },
    projet: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Client = model("client", clientSchema);

module.exports = Client;
