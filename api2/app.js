const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const cartsRouter = require("./routes/carts");
const likesRouter = require("./routes/likes");
const ordersRouter = require("./routes/orders");
const categoryRouter = require("./routes/category");

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // 요청을 보내는 정확한 출처를 명시합니다
  credentials: true, // 자격 증명이 포함된 요청을 허용합니다
};
app.use(cors(corsOptions));

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/carts", cartsRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(process.env.PORT, () => {
  console.log("서버가 시작됩니다");
});
