const { StatusCodes } = require("http-status-codes");
//const conn = require("../mariadb");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth");
// 성민석;
const order = async (req, res) => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bookshop",
    dateStrings: true,
  });
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
  const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
    req.body;

  const sql = "insert into delivery(address,receiver, contact) values(?,?,?)";
  const values = [delivery.address, delivery.receiver, delivery.contact];

  let [result] = await conn.execute(sql, values);
  let deliveryId = result.insertId;

  const sql2 =
    "insert into orders(book_title,total_quantity,total_price,user_id,delivery_id) values(?,?,?,?,?)";
  const values2 = [
    firstBookTitle,
    totalQuantity,
    totalPrice,
    token.id,
    deliveryId,
  ];

  [result] = await conn.execute(sql2, values2);
  let orderId = result.insertId;

  const sql5 = "select book_id,quantity from cartitems where id in (?)";
  let [orderItems, fields] = await conn.query(sql5, [items]);

  const sql3 = "insert into orderedBook (order_id,book_id,quantity) values ?";
  const values3 = [];
  orderItems.forEach((item) => {
    values3.push([orderId, item.book_id, item.quantity]);
  });
  result = await conn.query(sql3, [values3]);

  result = await deleteCartItems(conn, items);

  return res.status(StatusCodes.OK).send(result);
};

const deleteCartItems = async (conn, items) => {
  const sql4 = "delete from cartitems where id in (?)";

  let result = await conn.query(sql4, [items]);
  return result;
};

const getOrders = async (req, res) => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bookshop",
    dateStrings: true,
  });
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

  const sql =
    "select orders.id,book_title,total_quantity,total_price,created_at,address,receiver,contact from orders left join delivery on orders.delivery_id = delivery.id";
  const [rows, fields] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetails = async (req, res) => {
  const { id } = req.params;
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bookshop",
    dateStrings: true,
  });
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
  const sql =
    "select book_id,title,author,price,quantity from orderedBook left join books on orderedBook.book_id  = books.id where order_id = ?";
  const [rows, fields] = await conn.query(sql, [id]);
  return res.status(StatusCodes.OK).json(rows);
};

module.exports = { order, getOrders, getOrderDetails };

//insert into delivery(address,receiver, contact) values("서울","중구","010-1234-1234")
//insert into orders(book_title,total_quantity,total_price,user_id,delivery_id) values("어린왕자들",3,60000,1,1);
//insert into orderedBook (order_id,book_id,quantity) values(1,1,1);
//insert into orderedBook (order_id,book_id,quantity) values(1,3,2);
//SELECT max(id) as id FROM bookshop.orderedBook; 이걸로 orders 딜리버리id에 넣어준다

// 내가 생각한 노드 비동기 코드
// 콜백헬
// const order = (req, res) => {
//   const {
//     items,
//     delivery,
//     totalQuantity,
//     totalPrice,
//     user_id,
//     firstBookTitle,
//   } = req.body;

//   const sql1 = "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
//   const values1 = [delivery.address, delivery.receiver, delivery.contact];

//   conn.query(sql1, values1, (err, result) => {
//     if (err) {
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }

//     const deliveryId = result.insertId;

//     const sql2 = "INSERT INTO orders(book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
//     const values2 = [firstBookTitle, totalQuantity, totalPrice, user_id, deliveryId];

//     conn.query(sql2, values2, (err, result) => {
//       if (err) {
//         return res.status(StatusCodes.BAD_REQUEST).end();
//       }

//       const orderId = result.insertId;

//       const sql3 = "INSERT INTO orderedBook(order_id, book_id, quantity) VALUES ?";
//       const values3 = items.map((item) => [orderId, item.book_id, item.quantity]);

//       conn.query(sql3, [values3], (err, result) => {
//         if (err) {
//           return res.status(StatusCodes.BAD_REQUEST).end();
//         }

//         return res.status(StatusCodes.OK).send(result);
//       });
//     });
//   });
// };

// 프로미스
// const { StatusCodes } = require("http-status-codes");
// const conn = require("../mariadb");

// const order = (req, res) => {
//   const { items, delivery, totalQuantity, totalPrice, user_id, firstBookTitle } = req.body;

//   insertDelivery(delivery.address, delivery.receiver, delivery.contact)
//     .then(deliveryResult => {
//       const deliveryId = deliveryResult.insertId;
//       return insertOrder(firstBookTitle, totalQuantity, totalPrice, user_id, deliveryId);
//     })
//     .then(orderResult => {
//       const orderId = orderResult.insertId;
//       return insertOrderedBook(orderId, items);
//     })
//     .then(orderedBookResult => {
//       res.status(StatusCodes.OK).send(orderedBookResult);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(StatusCodes.BAD_REQUEST).end();
//     });
// };

// const insertDelivery = (address, receiver, contact) => {
//   return new Promise((resolve, reject) => {
//     const sql = "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
//     const values = [address, receiver, contact];
//     conn.query(sql, values, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// 어싱크 , 어웨잇
// const { StatusCodes } = require("http-status-codes");
// const conn = require("../mariadb");

// const order = async (req, res) => {
//   try {
//     const { items, delivery, totalQuantity, totalPrice, user_id, firstBookTitle } = req.body;

//     const deliveryResult = await insertDelivery(delivery.address, delivery.receiver, delivery.contact);
//     const deliveryId = deliveryResult.insertId;

//     const orderResult = await insertOrder(firstBookTitle, totalQuantity, totalPrice, user_id, deliveryId);
//     const orderId = orderResult.insertId;

//     const orderedBookResult = await insertOrderedBook(orderId, items);

//     res.status(StatusCodes.OK).send(orderedBookResult);
//   } catch (error) {
//     console.error(error);
//     res.status(StatusCodes.BAD_REQUEST).end();
//   }
// };

// const insertDelivery = (address, receiver, contact) => {
//   return new Promise((resolve, reject) => {
//     const sql = "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
//     const values = [address, receiver, contact];
//     conn.query(sql, values, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };
