import { v4 as uuid } from "uuid";

import { Product } from "../types/types";

/**
 *  This function generate a random ID. It also checks
 *  whether the randomly generated ID does not collide with
 *  exisiting products' ID.
 *
 *  It returns the randomly generated unique ID.
 */
export const generateUniqueId = (products: Product[]): string => {
  let id: string;
  let idCollision = false;

  do {
    id = uuid();
    idCollision =
      products.findIndex((product) => product.productId === id) !== -1;
  } while (idCollision);

  return id;
};
