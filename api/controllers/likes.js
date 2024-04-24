const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");

const verifyToken = require("../auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//성민석
const addLike = (req, res) => {
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
  const sql = "insert into likes (user_id, liked_book_id) values (?,?)";
  const values = [token.id, req.params.id];

  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send("좋아요 성공");
  });
};

const deleteLike = (req, res) => {
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
  const sql = "delete from likes where user_id = ? and liked_book_id = ?";
  const values = [token.id, req.params.id];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send("좋아요 삭제");
  });
};

module.exports = { addLike, deleteLike };

// const verifyToken = (req, res) => {
//   try {
//     let token = req.headers.authorization;

//     const decodedJwt = jwt.verify(token, process.env.JWTKEY);
//     return decodedJwt;
//   } catch (err) {
//     console.log(err.name, err.message);
//     return err;
//   }
// };
