import fs from "fs";
import { Product } from "../types/types";
import { sampleDataFilePath } from "../data/constants";

/**
 *  This function reads the sample product data file and
 *  returns all products in the file.
 */
export const getProducts = (): Product[] => {
  let products: Product[] = [];
  try {
    products = JSON.parse(fs.readFileSync(sampleDataFilePath).toString());
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  return products;
};

/**
 *  This function writes the data passed in to the sample data
 *  file. If the sample data file does not exist, this function
 *  will throw an error and will not proceed with writing operation.
 */
export const saveToFile = (data: Product[]): void => {
  if (!fs.existsSync(sampleDataFilePath))
    throw new Error("Server error : Write error on file");
  fs.writeFileSync(sampleDataFilePath, JSON.stringify(data));
};
