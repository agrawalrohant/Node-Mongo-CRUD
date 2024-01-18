const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/api/allUsers", getAllUsersHandler);
app.get("/api/user/:id", getUserByIDHandler);
app.post("/api/user", createUserHandler);
app.put("/api/user", updateUserHandler);
app.patch("/api/user", updateUserPartialHandler);

/**
 * Method to get the All Users
 * @param {*} req
 * @param {*} res
 */
function getAllUsersHandler(req, res) {
  try {
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
function getUserByIDHandler(req, res) {
  try {
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
function createUserHandler(req, res) {
  try {
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
function updateUserHandler(req, res) {
  try {
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
function updateUserPartialHandler(req, res) {
  try {
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
