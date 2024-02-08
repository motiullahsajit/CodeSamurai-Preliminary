const User = require("../models/user");

const createUser = async (req, res, next) => {
  try {
    const { id, username, email, password, firstName, lastName, dateOfBirth } =
      req.body;

    const existingUser = await User.findById(id);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const newUser = new User({
      id,
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
