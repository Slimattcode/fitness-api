const express = require("express");
require("dotenv").config({ path: "config.env" });
require("express-async-errors");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");
const { swaggerDocs: v1SwaggerDocs } = require("./v1/swagger");

const app = express();

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      v1SwaggerDocs(app, PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app; // for unit and functional testing;
