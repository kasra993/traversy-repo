const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add some text field");
  }
  const goal = Goal.create({
    text: req.body.text,
  });
  res.status(200).json(req.body.text);
});
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found ");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findOneAndDelete(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("there is not such goal");
  }

  res.json(
    `the requested goal by the id of ${req.params.id} has been terminated`
  );
});

module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
