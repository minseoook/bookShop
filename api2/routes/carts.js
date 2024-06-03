const express = require("express");
const { addCart, getCart, deleteCart } = require("../controllers/carts");
const router = express.Router();

router.post("/", addCart);
router.get("/", getCart);
router.delete("/:id", deleteCart);

module.exports = router;
