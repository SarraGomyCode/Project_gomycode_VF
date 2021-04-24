const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const rapportSchema = new Schema(
  {
    projet: {
      type: String,
      required: true,
    },
    consultant: { type: Schema.ObjectId, ref: "user" },
    client: { type: Schema.ObjectId, ref: "client" },
    kilo_depart: {
      type: Number,
    },
    kilo_retour: {
      type: Number,
    },
    tache_effectuee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rapport = model("rapport", rapportSchema);

module.exports = Rapport;
