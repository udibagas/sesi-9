const pool = require("../db");
const { toRupiah } = require("../helpers/number");

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  get priceInRupiah() {
    return toRupiah(this.price);
  }

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM "Products"`);
    return rows.map((el) => {
      return new Product(el.id, el.name, el.price, el.stock);
    });
  }
}

module.exports = Product;
