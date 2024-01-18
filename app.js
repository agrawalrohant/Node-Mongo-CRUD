const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

/** Data base connection Start*/
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    //console.log(result);
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
/** Data base connection Ends*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Password and confirm password should be the same",
    },
  },
});

const userModel = mongoose.model("User", userSchema);

app.get("/api/allUsers", getAllUsersHandler);
app.get("/api/user/:id", getUserByIDHandler);
app.post("/api/user", createUserHandler);
app.put("/api/user/:id", updateUserHandler);
app.patch("/api/user/:id", updateUserPartialHandler);
app.delete("/api/user/:id", deleteUserByIDHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/**
 * Method to get the All Users
 * @param {*} req
 * @param {*} res
 */
async function getAllUsersHandler(req, res) {
  try {
    const allUser = await userModel.find();
    if (allUser.length === 0) {
      throw new Error("No user found");
    } else {
      res.json({
        status: 200,
        message: "Data found",
        data: allUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Method to get the User by its id
 * @param {*} req
 * @param {*} res
 */
async function getUserByIDHandler(req, res) {
  try {
    const { id } = req.params;
    console.log("getting userId", id);
    const user = await userModel.findById(id);
    if (user) {
      res.json({
        status: 200,
        message: "User found",
        data: user,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Method to Create a new user
 * @param {*} req
 * @param {*} res
 */
async function createUserHandler(req, res) {
  try {
    const newUser = req.body;
    const isEmpty = Object.keys(newUser).length === 0;
    if (isEmpty) {
      throw new Error("Body cannot be empty");
    }
    await userModel.create(newUser);
    res.status(201).json({
      message: "User Created Successfully",
      date: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Method to Update a user
 * @param {*} req
 * @param {*} res
 */
async function updateUserHandler(req, res) {
  try {
    const { id } = req.params;
    console.log("updating userId", id);
    const updatedUser = req.body;
    const isEmpty = Object.keys(updatedUser).length === 0;
    if (isEmpty) {
      throw new Error("Body cannot be empty");
    }
    await userModel.findOneAndReplace({ _id: id }, updatedUser, {
      runValidators: true,
    });
    res.status(200).json({
      message: "User Updated Successfully",
      date: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Method to partially update a user
 * @param {*} req
 * @param {*} res
 */
async function updateUserPartialHandler(req, res) {
  try {
    const { id } = req.params;
    console.log("updating userId", id);
    const updatedUser = req.body;
    const isEmpty = Object.keys(updatedUser).length === 0;
    if (isEmpty) {
      throw new Error("Body cannot be empty");
    }
    await userModel.findByIdAndUpdate(id, updatedUser, {
      runValidators: true,
    });
    res.status(200).json({
      message: "User Updated Successfully",
      date: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Method to delete a user
 * @param {*} req
 * @param {*} res
 */
async function deleteUserByIDHandler(req, res) {
  try {
    const { id } = req.params;
    console.log("deleting userId", id);
    const user = await userModel.deleteOne({ _id: id });
    if (user) {
      res.json({
        status: 200,
        message: "User Deleted Successfully",
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
