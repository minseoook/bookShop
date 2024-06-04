const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");

const getAllCategory = (req, res) => {
  const sql = "select * from category";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  });
};
module.exports = { getAllCategory };
