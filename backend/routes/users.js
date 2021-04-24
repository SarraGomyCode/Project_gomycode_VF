const express = require("express");

const router = express.Router();
//controllers
const {
  getUsers,
  // getAddPage,
  postAddUser,
  getUserById,
  updateUserById,
  deleteUserById,
  Signup,
  SignIn,
} = require("../controllers/userControllers");
const isAuth = require("../middlewares/auth_jwt");

const {
  registerValidation,
  signinValidation,
  validation,
} = require("../middlewares/user");

router.get("/", getUsers);
//Add user
// router.get("/add", getAddPage);
router.post("/add", Signup);
router.post("/signup", Signup);
router.post("/signin", signinValidation(), validation, SignIn);
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});
//User by ID
router.get("/:id", getUserById);
router.post("/:id", updateUserById);
router.delete("/:id", deleteUserById);



module.exports = router;
