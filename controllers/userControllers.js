//package
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

//model
const User = require("../models/user");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`get user failed ${err.message}`));
};

const getAddPage = (req, res) => {
  res.json("user page!");
};

const postAddUser = (req, res) => {
  console.log(req)
  let user = new User(req.body);
  user
    .save()
    .then(() => res.json("user added!"))
    .catch((err) => res.status(400).json(`add user failed ${err.message}`));
};

const getUserById = (req, res) => {
  let { id } = req.params;

  User.findById(id)
    .then((user) => (user ? res.json(user) : res.json("user doesn't exist")))
    .catch((err) => res.status(400).json(`add user failed ${err.message}`));
};

const updateUserById = (req, res) => {
  let { id } = req.params;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(() => res.json(`user updated`))
    .catch((err) =>
      res.status(400).json(`user update it failed ${err.message}`)
    );
};

const deleteUserById = (req, res) => {
  let { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => res.json(`user deleted`))
    .catch((err) => res.status(400).json(`delete user failed ${err.message}`));
};


const Signup = async (req, res) => {
  try {
    console.error("Signup")
    //   req.body
    const { name, lastName, email, phone, password } = req.body;

    // check if the email is not found in the database
    const FoundUser = await User.findOne({ email });

    if (FoundUser) {
      res.status(400).send({
        errors: [{ msg: "user already exist email should be unique" }],
      });
      return;
    }
    const newUser = new User(req.body);

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashedpassword;

    // create a key using json webtoken
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
    //then we save it in the database
    await newUser.save();
    res.status(200).send({ msg: "user saved succ", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};


const SignIn = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchUser = await User.findOne({ email });

    // send an error if he didnt exist
    if (!searchUser) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchUser.password;
    const result = await bcrypt.compare(password, hashedpass);
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // else create a key
    const token = jwt.sign(
      {
        id: searchUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 }
    );

    // send the details + a key
    res.status(200).send({ msg: "auth success", user: searchUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get the currentUser" }] });
  }
};


module.exports = {
  getUsers,
  getAddPage,
  postAddUser,
  getUserById,
  updateUserById,
  deleteUserById,
  Signup,
  SignIn
};
