const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      const decodedJwt = jwt.verify(token, process.env.ACCESSJWTKEY);
      return decodedJwt;
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    console.log(err.name, err.message);
    return err;
  }
};

module.exports = verifyToken;
