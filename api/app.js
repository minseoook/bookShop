const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const cartsRouter = require("./routes/carts");
const likesRouter = require("./routes/likes");
const ordersRouter = require("./routes/orders");
const categoryRouter = require("./routes/category");

app.use(express.json());

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
