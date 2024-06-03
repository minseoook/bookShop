const { StatusCodes } = require("http-status-codes");
const conn = require("../mariadb");

//콜백헬 버전
const order = (req, res) => {
  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    user_id,
    firstBookTitle,
  } = req.body;

  const sql = "insert into delivery(address,receiver, contact) values(?,?,?)";
  const values = [delivery.address, delivery.receiver, delivery.contact];
  let deliveryId;

  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    deliveryId = result.insertId;
    const sql2 =
      "insert into orders(book_title,total_quantity,total_price,user_id,delivery_id) values(?,?,?,?,?)";
    const values2 = [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      user_id,
      deliveryId,
    ];
    let orderId;
    conn.query(sql2, values2, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      orderId = result.insertId;
      const sql3 =
        "insert into orderedBook (order_id,book_id,quantity) values ?";
      const values3 = [];
      items.forEach((item) => {
        values3.push([orderId, item.book_id, item.quantity]);
      });
      conn.query(sql3, [values3], (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).send(result);
      });
    });
  });
};
//프로미스로만 짠 버전
const order2 = (req, res) => {
  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    user_id,
    firstBookTitle,
  } = req.body;

  insertDelivery(delivery.address, delivery.receiver, delivery.contact)
    .then((deliveryResult) => {
      const deliveryId = deliveryResult.insertId;
      return insertOrder(
        firstBookTitle,
        totalQuantity,
        totalPrice,
        user_id,
        deliveryId
      );
    })
    .then((orderResult) => {
      const orderId = orderResult.insertId;
      return insertOrderedBook(orderId, items);
    })
    .then((orderedBookResult) => {
      res.status(StatusCodes.OK).send(orderedBookResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(StatusCodes.BAD_REQUEST).end();
    });
};

const insertDelivery = (address, receiver, contact) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
    const values = [address, receiver, contact];
    conn.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertOrder = (
  firstBookTitle,
  totalQuantity,
  totalPrice,
  user_id,
  deliveryId
) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO orders(book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
    const values = [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      user_id,
      deliveryId,
    ];
    conn.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertOrderedBook = (orderId, items) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
    const values = items.map((item) => [orderId, item.book_id, item.quantity]);
    conn.query(sql, [values], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const order3 = async (req, res) => {
  try {
    const {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      user_id,
      firstBookTitle,
    } = req.body;

    const deliveryResult = await insertDelivery2(
      delivery.address,
      delivery.receiver,
      delivery.contact
    );
    const deliveryId = deliveryResult.insertId;

    const orderResult = await insertOrder2(
      firstBookTitle,
      totalQuantity,
      totalPrice,
      user_id,
      deliveryId
    );
    const orderId = orderResult.insertId;

    const orderedBookResult = await insertOrderedBook2(orderId, items);

    res.status(StatusCodes.OK).send(orderedBookResult);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};

const insertDelivery2 = async (address, receiver, contact) => {
  const sql =
    "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
  const values = [address, receiver, contact];

  try {
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const insertOrder2 = async (
  firstBookTitle,
  totalQuantity,
  totalPrice,
  user_id,
  deliveryId
) => {
  const sql =
    "INSERT INTO orders(book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
  const values = [
    firstBookTitle,
    totalQuantity,
    totalPrice,
    user_id,
    deliveryId,
  ];

  try {
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const insertOrderedBook2 = async (orderId, items) => {
  const sql = "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
  const values = items.map((item) => [orderId, item.book_id, item.quantity]);

  try {
    const result = await conn.query(sql, [values]);
    return result;
  } catch (error) {
    throw error;
  }
};

const order10 = async (req, res) => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "minseooook",
    password: "minseooook",
    port: 3307,
    database: "bookshop",
    dateStrings: true,
  });

  try {
    const {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      user_id,
      firstBookTitle,
    } = req.body;

    const insertDelivery2 = async (address, receiver, contact) => {
      const sql =
        "INSERT INTO delivery(address, receiver, contact) VALUES (?, ?, ?)";
      const values = [address, receiver, contact];

      try {
        const result = await conn.query(sql, values);
        return result;
      } catch (error) {
        throw error;
      }
    };

    const insertOrder2 = async (
      firstBookTitle,
      totalQuantity,
      totalPrice,
      user_id,
      deliveryId
    ) => {
      const sql =
        "INSERT INTO orders(book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
      const values = [
        firstBookTitle,
        totalQuantity,
        totalPrice,
        user_id,
        deliveryId,
      ];

      try {
        const result = await conn.query(sql, values);
        return result;
      } catch (error) {
        throw error;
      }
    };

    const insertOrderedBook2 = async (orderId, items) => {
      const sql =
        "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
      const values = items.map((item) => [
        orderId,
        item.book_id,
        item.quantity,
      ]);

      try {
        const result = await conn.query(sql, [values]);
        return result;
      } catch (error) {
        throw error;
      }
    };
    const deliveryResult = await insertDelivery2(
      delivery.address,
      delivery.receiver,
      delivery.contact
    );

    const deliveryId = deliveryResult[0].insertId;

    const orderResult = await insertOrder2(
      firstBookTitle,
      totalQuantity,
      totalPrice,
      user_id,
      deliveryId
    );
    const orderId = orderResult[0].insertId;

    const orderedBookResult = await insertOrderedBook2(orderId, items);

    res.status(StatusCodes.OK).send(orderedBookResult);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).end();
  }
};
