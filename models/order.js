const pool = require("../db");
const Customer = require("./customer");
const Product = require("./product");

class Order {
  constructor(
    id,
    date,
    ProductId,
    CustomerId,
    qty,
    price,
    totalAmount,
    customer,
    product
  ) {
    this.id = id;
    this.date = date;
    this.ProductId = ProductId;
    this.CustomerId = CustomerId;
    this.qty = qty;
    this.price = price;
    this.totalAmount = totalAmount;
    const { name, gender, email, phone, address } = customer;
    this.customer = new Customer(
      CustomerId,
      name,
      gender,
      email,
      phone,
      address
    );

    this.product = new Product(
      ProductId,
      product.name,
      product.price,
      product.stock
    );
  }

  static async findAll() {
    const query = `
      SELECT
        o.*,
        c.name AS "customerName",
        c.gender AS "customerGender",
        c.phone AS "customerPhone",
        c.email AS "customerEmail",
        c.address AS "customerAddress",
        p.name AS "productName",
        p.stock AS "productStock",
        p.price AS "productPrice"
      FROM "Orders" o
      JOIN "Customers" c ON c.id = o."CustomerId"
      JOIN "Products" p ON p.id = o."ProductId"
      ORDER BY "date" DESC
    `;
    const { rows, rowCount } = await pool.query(query);

    const orders = rows.map((el) => {
      return new Order(
        el.id,
        el.date,
        el.ProductId,
        el.CustomerId,
        el.qty,
        el.price,
        el.totalAmount,
        {
          name: el.customerName,
          gender: el.customerGender,
          phone: el.customerPhone,
          email: el.customerEmail,
          address: el.customerAddress,
        },
        {
          name: el.productName,
          price: el.productPrice,
          stock: el.productStock,
        }
      );
    });

    return orders;
  }

  static async create({ CustomerId, ProductId, qty }) {
    const product = await Product.findById(ProductId);

    const query = `
      INSERT INTO "Orders" ("date", "CustomerId", "ProductId", "qty", "price", "totalAmount")
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      new Date(),
      CustomerId,
      ProductId,
      Number(qty),
      product.price,
      Number(qty) * product.price,
    ];

    await pool.query(query, values);
  }

  static async remove(id) {
    await pool.query(`DELETE FROM "Orders" WHERE id = $1`, [id]);
  }
}

module.exports = Order;
