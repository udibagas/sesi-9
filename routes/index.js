const { home, products, customers, orders } = require("../controllers");
const router = require("express").Router();

router.get("/", home);
router.get("/products", products);
router.get("/customers", customers);
router.get("/orders", orders);

module.exports = router;
