const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
