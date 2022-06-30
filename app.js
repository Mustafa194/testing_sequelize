const express = require("express");
const { sequelize } = require("./models");
const { badRequest, internal } = require("./middlewares/ApiError");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/users"));

app.use(badRequest);
app.use(internal);

app.listen({ port: 5000 }, async() => {
    // console.log("Server up on http://localhost:5000");
    await sequelize.authenticate();
    // console.log("Database connected!");
});