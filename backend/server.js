const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const goals = require("./routes/goalRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goals);
app.use("/api/users", require("./routes/userRoutes"));
//serve front end
if (process.env.Node_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("please set to production"));
}
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
