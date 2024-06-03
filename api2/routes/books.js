const express = require("express");
const router = express.Router();
const { getAllBooks, getBookDetail } = require("../controllers/book");

router.get("/", getAllBooks);

router.get("/:id", getBookDetail);

// router.get("/", getBooksByCategory);
module.exports = router;
