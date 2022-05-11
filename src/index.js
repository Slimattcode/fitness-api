const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({path: "config.env"});

// const v1Router = require("./v1/routes");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");
const { swaggerDocs: v1SwaggerDocs } = require("./v1/swagger");

const app = express();

/*// for testing purposes
app.get("/", (req, res) => {
    res.send("It's working!")
});
*/

// app.use("/api/v1", v1Router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    v1SwaggerDocs(app, PORT);
});

module.exports = app; // for unit and functional testing;