const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth");
//성민석
/*const getAllBooks = (req, res) => {
  let allBooksRes = {};
  let { category_id, news, limit = 8, currentPage = 1 } = req.query; //limit *(currentPage -1)
  let offset = limit * (currentPage - 1);

  let sql =
    "select sql_calc_found_rows *,(SELECT count(*) FROM bookshop.likes where liked_book_id = books.id) as likes from books ";
  let values = [];
  if (category_id && news) {
    sql +=
      "where category_id = ? and pub_date between date_sub(now(), interval 1 month)  and now()  ";
    values = [...values, category_id];
  } else if (category_id) {
    sql += "where category_id = ?";
    values = [...values, category_id];
  } else if (news) {
    sql +=
      "where pub_date between date_sub(now(), interval 1 month)  and now() ";
  }
  sql += " limit ? offset ?";
  values = [...values, parseInt(limit), offset];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("책이 없다");
    } else {
      result.map((a) => {
        a.pubDate = a.pub_date;
        delete result.pub_date;
      });
      allBooksRes.books = result;
      sql = " select found_rows()";
      conn.query(sql, (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (result) {
          let pagination = {};
          pagination.currentPage = parseInt(currentPage);
          pagination.totalCount = result[0]["found_rows()"];
          allBooksRes.pagination = pagination;
          return res.status(StatusCodes.OK).json(allBooksRes);
        }
      });
    }
  });
};*/
const getAllBooks = (req, res) => {
  let allBooksRes = {};
  let { category_id, news, limit = 8, currentPage = 1, q } = req.query; //limit *(currentPage -1)
  let offset = limit * (currentPage - 1);

  let sql =
    "select sql_calc_found_rows *,(SELECT count(*) FROM bookshop.likes where liked_book_id = books.id) as likes from books ";
  let values = [];
  if (category_id && news) {
    sql +=
      "where category_id = ? and pub_date between date_sub(now(), interval 1 month)  and now()  ";
    values = [...values, category_id];
  } else if (category_id) {
    sql += "where category_id = ?";
    values = [...values, category_id];
  } else if (news) {
    sql +=
      "where pub_date between date_sub(now(), interval 1 month)  and now() ";
  }

  // 검색어가 존재하는 경우, 책 제목이나 작가 이름에서 검색
  if (q) {
    if (category_id || news) {
      sql += "AND ";
    } else {
      sql += "WHERE ";
    }
    sql += "(title LIKE ? OR author LIKE ?) ";
    values = [...values, `%${q}%`, `%${q}%`];
  }

  sql += " limit ? offset ?";
  values = [...values, parseInt(limit), offset];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("책이 없다");
    } else {
      result.map((a) => {
        a.pubDate = a.pub_date;
        delete result.pub_date;
      });
      allBooksRes.books = result;
      sql = " select found_rows()";
      conn.query(sql, (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (result) {
          let pagination = {};
          pagination.currentPage = parseInt(currentPage);
          pagination.totalCount = result[0]["found_rows()"];
          allBooksRes.pagination = pagination;
          return res.status(StatusCodes.OK).json(allBooksRes);
        }
      });
    }
  });
};

const getBookDetail = (req, res) => {
  let id = req.params.id;
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
  if (token instanceof ReferenceError) {
    const values = [id];
    const sql =
      "select *, (SELECT count(*) FROM bookshop.likes where liked_book_id = books.id) as likes from books left join category on books.category_id = category.category_id where books.id = ?";
    conn.query(sql, values, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (result.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("책이 없다");
      }

      return res.status(StatusCodes.OK).json(result);
    });
  } else {
    const values = [token.id, id, id];
    const sql =
      "select *,(select exists (select * from likes where user_id =? and liked_book_id = ?)) as liked, (SELECT count(*) FROM bookshop.likes where liked_book_id = books.id) as likes from books left join category on books.category_id = category.category_id where books.id = ?";
    conn.query(sql, values, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (result.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("책이 없다");
      }
      return res.status(StatusCodes.OK).json(result);
    });
  }
};

// const getBooksByCategory = (req, res) => {
//   let { category_id } = req.query;

//   const sql = "select * from books where id = ?";
//   conn.query(sql, category_id, (err, result) => {
//     if (err) {
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }
//     if (result.length === 0) {
//       return res.status(StatusCodes.NOT_FOUND).send("책이 없다");
//     }
//     return res.status(StatusCodes.OK).json(result);
//   });
// };

module.exports = { getAllBooks, getBookDetail };

// SELECT count(*) FROM bookshop.likes where liked_book_id = 1;
// select *,(SELECT count(*) FROM bookshop.likes where liked_book_id = books.id) as likes from books
// select *,(select exists (select * from likes where user_id =1 and liked_book_id = 1)) as liked, (SELECT count(*) FROM bookshop.likes where liked_book_id = 1) as likes from books where id=1;
