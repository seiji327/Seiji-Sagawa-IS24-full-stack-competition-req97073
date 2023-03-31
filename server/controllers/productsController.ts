import { Request, Response } from "express";

import { Product, ProductReqBody, Data } from "../types/types";
import { validateFormData } from "../validations/formDataValidation";
import { generateUniqueId } from "../helpers/generateUniqueId";
import { getProducts, saveToFile } from "../helpers/fileOperations";

/**
 *  This variable holds an object that consists with
 *  sample products data and setting the products function.
 */
const data: Data = {
  products: getProducts(),
  setProducts: function (data: Product[]) {
    this.products = data;
  },
};

/**
 *  This function handles GET request of all products.
 *  It returns the products data with the status code 200.
 */
const getAllProducts = (_req: Request, res: Response) => {
  return res.status(200).json(data.products);
};

/**
 *  This function handles GET request of a specific product
 *  with the productId given.
 *
 *  If the product is found, it returns the product with the status code 200.
 *  Otherwise, it returns error message with status code 404.
 */
const getProduct = (req: Request<{ productId: string }>, res: Response) => {
  const id = req.params.productId;
  const product = data.products.find((product) => product.productId === id);

  if (!product) {
    return res.status(404).send(`Product not found with id ${id}`);
  }
  return res.status(200).json(product);
};

/**
 *  This function handles POST request to create a new product.
 *
 *  If the creation is successfull, it returns the product created with status
 *  code 201. If any error occurrs, it returns the error message with
 *  corresponding status code.
 */
const createProduct = (
  req: Request<any, Response, ProductReqBody>,
  res: Response
) => {
  if (!req.body) return res.status(400).send("Content can not be empty");

  if (!validateFormData(req.body))
    return res.status(422).send("All fields must be filled.");

  const id = generateUniqueId(data.products);

  const newProduct: Product = {
    productId: id,
    ...req.body,
  };

  data.setProducts([...data.products, newProduct]);

  try {
    saveToFile(data.products);
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
  }

  return res.status(201).json(newProduct);
};

/**
 *  This function handles PUT request to update a product with productId given.
 *
 *  If the update is successfull, it returns the updated product with status
 *  code 200. If any error occurrs, it returns the error message with
 *  corresponding status code.
 */
const updateProduct = (req: Request<any, Response, Product>, res: Response) => {
  if (!req.body) return res.status(400).send("Content can not be empty");

  if (!validateFormData(req.body))
    return res.status(422).send("All fields must be filled.");

  const productIndexToUpdate = data.products.findIndex(
    (product) => product.productId === req.body.productId
  );

  if (productIndexToUpdate === -1)
    return res
      .status(404)
      .send(`Product with ID ${req.body.productId} not found.`);

  data.products[productIndexToUpdate] = req.body;

  try {
    saveToFile(data.products);
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
  }

  return res.status(200).json(req.body);
};

/**
 *  This function handles DELETE request to delete a product with productId given.
 *
 *  If the deletion is successfull, it returns the successful delete
 *  message  with status code 200. If any error occurrs, it returns the error message with
 *  corresponding status code.
 */
const deleteProduct = (req: Request<{ productId: string }>, res: Response) => {
  const id = req.params.productId;
  const productIndexToDelete = data.products.findIndex(
    (product) => product.productId === id
  );

  if (productIndexToDelete === -1) {
    return res.status(404).send(`Product not found with id ${id}`);
  }

  //Remove the product to delete from products array.
  data.products.splice(productIndexToDelete, 1);
  data.setProducts(data.products);

  try {
    saveToFile(data.products);
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
  }

  return res.status(200).send("Product has been deleted");
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
