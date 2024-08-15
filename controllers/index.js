const { formatDate } = require("../helpers/date");
const { toRupiah } = require("../helpers/number");
const Customer = require("../models/customer");
const Order = require("../models/order");
const Product = require("../models/product");

exports.home = (req, res) => {
  res.render("home");
};

exports.products = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).render("products", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.customers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).render("customers", { customers });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.orders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    // res.json(orders);
    // console.log(orders[0]);
    res.status(200).render("orders", { orders, toRupiah, formatDate });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
