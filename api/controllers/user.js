const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  let sql = "insert into users (email, password,salt) values (?,?,?)";
  let values = [email, hashPassword, salt];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.affectedRows) {
      return res.status(StatusCodes.CREATED).json("회원가입 성공");
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "select * from users where email =?";
  const values = email;
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
    }
    const hashPassword = crypto
      .pbkdf2Sync(password, result[0].salt, 10000, 10, "sha512")
      .toString("base64");
    if (result[0] && result[0].password === hashPassword) {
      const token = jwt.sign(
        { email: email, id: result[0].id },
        process.env.JWTKEY,
        {
          expiresIn: "30m",
          issuer: "minseok",
        }
      );

      res.cookie("token", token, { httpOnly: true });
      console.log(token);
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.UNAUTHORIZED).json("값이 올바르지 않다");
  });
};

const passwordResetRequest = (req, res) => {
  const email = req.body.email;
  const sql = "select * from users where email =?";
  const values = email;
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
    }
    const user = result[0];
    if (user) {
      return res.status(StatusCodes.OK).json(email);
    }
    return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordReset = (req, res) => {
  const { password, email } = req.body;

  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
  const sql = "update users set password =?, salt =?  where email = ?";
  const values = [hashPassword, salt, email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
    }
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};
module.exports = { join, login, passwordReset, passwordResetRequest };
