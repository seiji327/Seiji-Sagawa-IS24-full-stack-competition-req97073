import express, { Router } from "express";

const router: Router = express.Router();
const productsController = require("../../controllers/productsController");

/**
 * Route for get all products, post a new product and
 * update a product.
 */
router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct)
  .put(productsController.updateProduct);

/**
 * Route for get or delete a specific product.
 */
router
  .route("/:productId")
  .get(productsController.getProduct)
  .delete(productsController.deleteProduct);

export { router as productsRouter };
