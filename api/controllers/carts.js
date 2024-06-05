const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("../auth");
dotenv.config();
//성민석
const addCart = (req, res) => {
  const { book_id, quantity } = req.body;
  const token = verifyToken(req, res);

  if (token instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 다시 하세요" });
  }
  if (
    token instanceof jwt.JsonWebTokenError ||
    token instanceof ReferenceError
  ) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "토큰 값이 이상합니다" });
  }
  if (token instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "토큰 값이 이상합니다" });
  }

  const sql =
    "insert into cartitems ( book_id, quantity,user_id) values(?,?,?)";

  const values = [book_id, quantity, token.id];
  conn.query(sql, values, (err, result) => {
    if (err) {
      if (err instanceof ReferenceError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "토큰 값이 이상합니다" });
      }
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send(result);
  });
};
// const addCart = (req, res) => {
//   try {
//     const { book_id, quantity } = req.body;
//     const token = verifyToken(req, res);

//     const sql =
//       "insert into cartitems ( book_id, quantity,user_id) values(?,?,?)";
//     const values = [book_id, quantity, token.id];
//     conn.query(sql, values, (err, result) => {
//       if (err) {
//         return res.status(StatusCodes.BAD_REQUEST).end();
//       }
//       return res.status(StatusCodes.OK).send(result);
//     });
//   } catch (err) {
//     if (err instanceof jwt.TokenExpiredError) {
//       return res
//         .status(StatusCodes.UNAUTHORIZED)
//         .json({ message: "로그인 다시 하세요" });
//     }
//     if (err instanceof jwt.JsonWebTokenError || err instanceof ReferenceError) {
//       return res
//         .status(StatusCodes.UNAUTHORIZED)
//         .json({ message: "토큰 값이 이상합니다" });
//     }
//     console.log(err);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "서버 오류" });
//   }
// };
//성민석
const getCart = (req, res) => {
  const { selected } = req.body;
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

  let values = [];

  let sql =
    "SELECT cartitems.id,book_id,title,summary,quantity,price FROM cartitems left join books on books.id = cartitems.book_id where user_id = ? ";
  values = [token.id];
  if (selected) {
    sql += "and cartitems.id in (?)";
    values = [token.id, selected];
  }

  console.log(sql);
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send(result);
  });
};
//성민석
const deleteCart = (req, res) => {
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
  const { id } = req.params;
  const sql = "delete from cartitems where id = ?  ";
  const values = id;
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).send(result);
  });
};

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

module.exports = { addCart, getCart, deleteCart };
