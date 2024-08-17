const express = require("express");
const helmet = require("helmet");
const logging = require("./midlewares/Logging");
const mongoose = require("mongoose");
const studentsRouter = require("./routes/Students");
const staffRouter = require("./routes/Staff");
const classroomRouter = require("./routes/Classrooms");
const userRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const errorMW = require("./midlewares/ErrorMW");

const app = express();


mongoose.connect("mongodb://localhost:27017/university", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => { console.log("Connected....") })
    .catch((err) => { console.log(err) });

app.use(helmet());

process.on("uncaughtException", (exception) => {
    console.log("Uncaught Exception");
    process.exit(1);
});
process.on("unhandledRejection", (exception) => {
    console.log("Promise Rejected");
    process.exit(1);
});


app.use(logging)
app.use("/api/students", studentsRouter)
app.use("/api/staff", staffRouter);
app.use("/api/classrooms", classroomRouter);
app.use("/api/users", userRouter);
app.use("/api/login", authRouter);
app.use(errorMW);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});