const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add some text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found ");
  }
  // const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(401);
    throw new Error("u are not logged in ");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("you can not edit the data of another user");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("there is not such goal");
  }
  // const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(401);
    throw new Error("you are not logged in ");
  }
  if (req.user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("you can not delete another users goal");
  }

  await goal.remove();

  res.json(req.params.id);
});

module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
