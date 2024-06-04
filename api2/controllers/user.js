// const { StatusCodes } = require("http-status-codes");
// const conn = require("../mariadb");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const crypto = require("crypto");

// dotenv.config();

// let refreshTokens = [];

// const join = (req, res) => {
//   const { email, password } = req.body;
//   const salt = crypto.randomBytes(10).toString("base64");
//   const hashPassword = crypto
//     .pbkdf2Sync(password, salt, 10000, 10, "sha512")
//     .toString("base64");

//   let sql = "insert into users (email, password,salt) values (?,?,?)";
//   let values = [email, hashPassword, salt];
//   conn.query(sql, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }
//     if (result.affectedRows) {
//       return res.status(StatusCodes.CREATED).json("회원가입 성공");
//     } else {
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }
//   });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   console.log(email, password);
//   const sql = "select * from users where email =?";
//   const values = email;
//   conn.query(sql, values, (err, result) => {
//     // if (err) {
//     //   console.log(err);
//     //   return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
//     // }
//     if (result.length === 0) {
//       return res.status(401).json("값이 올바르지 않다"); // 이메일이 없을 때의 처리
//     }
//     const hashPassword = crypto
//       .pbkdf2Sync(password, result[0].salt, 10000, 10, "sha512")
//       .toString("base64");
//     console.log(hashPassword, result[0].password);
//     if (result[0] && result[0].password === hashPassword) {
//       const accessToken = jwt.sign(
//         { id: result[0].id },
//         process.env.ACCESSJWTKEY,
//         {
//           expiresIn: "30m",
//           issuer: "minseok",
//         }
//       );
//       const refreshToken = jwt.sign(
//         { id: result[0].id },
//         process.env.REFRESHJWYKEY,
//         {
//           expiresIn: "1d",
//           issuer: "minseok",
//         }
//       );
//       refreshTokens.push(refreshToken);

//       res.cookie("token", refreshToken, { httpOnly: true });
//       console.log(refreshToken, "refresh token");
//       console.log(accessToken, "access token");
//       return res.status(StatusCodes.OK).json({ ...result, accessToken });
//     }
//     return res.status(StatusCodes.UNAUTHORIZED).json("값이 올바르지 않다");
//   });
// };

// const passwordResetRequest = (req, res) => {
//   const email = req.body.email;
//   const sql = "select * from users where email =?";
//   const values = email;
//   conn.query(sql, values, (err, result) => {
//     if (err) {
//       return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
//     }
//     const user = result[0];
//     if (user) {
//       return res.status(StatusCodes.OK).json(email);
//     }
//     return res.status(StatusCodes.UNAUTHORIZED).end();
//   });
// };

// const passwordReset = (req, res) => {
//   const { password, email } = req.body;

//   const salt = crypto.randomBytes(10).toString("base64");
//   const hashPassword = crypto
//     .pbkdf2Sync(password, salt, 10000, 10, "sha512")
//     .toString("base64");
//   const sql = "update users set password =?, salt =?  where email = ?";
//   const values = [hashPassword, salt, email];
//   conn.query(sql, values, (err, result) => {
//     if (err) {
//       return res.status(StatusCodes.BAD_REQUEST).json("값이 올바르지 않다");
//     }
//     if (result.affectedRows === 0) {
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }
//     return res.status(StatusCodes.OK).json(result);
//   });
// };

// const checkEmail = (req, res) => {
//   const { email } = req.body;
//   const sql = "select * from users where email = ?";
//   conn.query(sql, email, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(StatusCodes.BAD_REQUEST).json("오류가 발생했습니다.");
//     }
//     if (result.length > 0) {
//       return res
//         .status(StatusCodes.CONFLICT)
//         .json("이미 사용 중인 이메일입니다.");
//     }
//     return res.status(StatusCodes.OK).json("사용 가능한 이메일입니다.");
//   });
// };

// const refresh = (req, res) => {
//   const refreshToken = req.body.token;

//   if (!refreshToken) return res.status(401).json("인증불가");
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(401).json("인증불가");
//   }
//   jwt.verify(refreshToken, process.env.REFRESHJWYKEY, (err, result) => {
//     err && console.log(err);
//     console.log(result);
//     const accessToken = jwt.sign({ id: result.id }, process.env.ACCESSJWTKEY, {
//       expiresIn: "30m",
//       issuer: "minseok",
//     });

//     res.status(200).json({
//       accessToken: accessToken,
//     });
//   });
// };
// module.exports = {
//   join,
//   login,
//   passwordReset,
//   passwordResetRequest,
//   checkEmail,
//   refresh,
// };
const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

dotenv.config();

const refreshTokensFile = path.join(__dirname, "refreshTokens.json");

let refreshTokens = [];
console.log(refreshTokens);
if (fs.existsSync(refreshTokensFile)) {
  const data = fs.readFileSync(refreshTokensFile);
  refreshTokens = JSON.parse(data);
}

const saveTokensToFile = () => {
  fs.writeFileSync(refreshTokensFile, JSON.stringify(refreshTokens));
};

const addRefreshToken = (token) => {
  refreshTokens.push(token);
  saveTokensToFile();
};

const removeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
  saveTokensToFile();
};

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

  const sql = "select * from users where email = ?";
  const values = email;
  conn.query(sql, values, (err, result) => {
    if (result.length === 0) {
      return res.status(401).json("값이 올바르지 않다");
    }

    const hashPassword = crypto
      .pbkdf2Sync(password, result[0].salt, 10000, 10, "sha512")
      .toString("base64");

    if (result[0] && result[0].password === hashPassword) {
      const accessToken = jwt.sign(
        { id: result[0].id },
        process.env.ACCESSJWTKEY,
        {
          expiresIn: "1h",
          issuer: "minseok",
        }
      );

      const refreshToken = jwt.sign(
        { id: result[0].id },
        process.env.REFRESHJWYKEY,
        {
          expiresIn: "1d",
          issuer: "minseok",
        }
      );

      addRefreshToken(refreshToken);

      res.cookie("token", refreshToken, { httpOnly: true });
      return res.status(StatusCodes.OK).json({ ...result, accessToken });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json("값이 올바르지 않다");
  });
};

const refresh = (req, res) => {
  const refreshToken = req.cookies.token;

  if (!refreshToken) return res.status(401).json("인증불가");

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(401).json("인증불가");
  }

  jwt.verify(refreshToken, process.env.REFRESHJWYKEY, (err, result) => {
    if (err) {
      console.log(err);
      res.clearCookie("token");
      removeRefreshToken(refreshToken);
      return res.status(401).json("인증불가");
    }

    const accessToken = jwt.sign({ id: result.id }, process.env.ACCESSJWTKEY, {
      expiresIn: "1h",
      issuer: "minseok",
    });

    res.status(200).json({
      accessToken: accessToken,
    });
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

const checkEmail = (req, res) => {
  const { email } = req.body;
  const sql = "select * from users where email = ?";
  conn.query(sql, email, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).json("오류가 발생했습니다.");
    }
    if (result.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json("이미 사용 중인 이메일입니다.");
    }
    return res.status(StatusCodes.OK).json("사용 가능한 이메일입니다.");
  });
};
const logout = (req, res) => {
  const refreshToken = req.cookies.token;

  if (refreshToken) {
    removeRefreshToken(refreshToken);
    res.clearCookie("token");
  }

  return res.status(StatusCodes.OK).json("로그아웃 성공");
};

module.exports = {
  join,
  login,
  passwordReset,
  passwordResetRequest,
  checkEmail,
  refresh,
  logout,
};
