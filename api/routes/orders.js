const express = require("express");
const { order, getOrders, getOrderDetails } = require("../controllers/order");
const router = express.Router();

router.post("/", order);
router.get("/", getOrders);
router.get("/:id", getOrderDetails);

module.exports = router;
