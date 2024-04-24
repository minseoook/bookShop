const express = require("express");
const { addLike, deleteLike } = require("../controllers/likes");
const router = express.Router();
//성민석
router.post("/:id", addLike);
router.delete("/:id", deleteLike);

module.exports = router;
