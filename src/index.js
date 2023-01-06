const express = require('express')
const userRouter =require('./route/user')
const bookRouter = require("./route/book")
const middleware = require('../src/middleware/validation/user')
const http = require("http");



const morgan = require('morgan')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);


mongoose
  .connect("mongodb://localhost:27017/BootCamp", {
    // useCreateIndex: true,
    // useFindAndModify: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfuly");
  });

const dotenv = require('dotenv')
dotenv.config('../.env');

const app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

// app.use("/api/V1/books");
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1/users",userRouter);
app.use("/api/v1/books",bookRouter);


app.use("*", (req, res, next) => {
    res.status(400).json({
      status: "error",
      message: `The requested url ${req.originalUrl} doesnot exist`,
    });
  });
  
  const port = process.env.PORT || 6000;
  server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });