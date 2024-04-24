const express = require("express");
const router = express.Router();

const {
  join,
  passwordReset,
  passwordResetRequest,
  login,
} = require("../controllers/user");

router.post("/login", login);

router.post("/join", join);

router.post("/reset", passwordResetRequest);

router.put("/reset", passwordReset);

module.exports = router;
