const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const verifyToken = require("../auth");
const jwt = require("jsonwebtoken");

const getAllCategory = (req, res) => {
  const token = verifyToken(req, res);
  if (token instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 다시 하세요" });
  }
  if (token instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "토큰 값이 이상합니다" });
  }

  const sql = "select * from category";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};
module.exports = { getAllCategory };
