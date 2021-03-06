var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var errorHandler = require("./middleware/errorHandle");
const { expressjwt } = require("express-jwt");
const config = require("./config/auth.config.js");

const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:8081",
};

var indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const authRoute = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  expressjwt({ secret: config.secret, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//, "/"],
  })
);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use(userRouter);
app.use(authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
app.use(errorHandler);

module.exports = app;
