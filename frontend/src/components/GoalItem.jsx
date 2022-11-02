import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  console.log(goal);
  return (
    <div className="goal">
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
    </div>
  );
};

export default GoalItem;
