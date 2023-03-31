import { createContext, ReactElement, useState, useEffect } from "react";

import axios, { AxiosResponse, AxiosError } from "axios";

import { Product, SearchBy, ProductContextType } from "../types/types";

axios.defaults.baseURL = "http://localhost:3000/api";

export const ProductContext = createContext<ProductContextType | null>(null);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

const ProductProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>("ScrumMaster");

  /**
   * Retrieve products data from backend.
   */
  useEffect(() => {
    axios
      .get("/products")
      .then((res: AxiosResponse<Product[]>) => setProducts(res.data))
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error(`${error.response.status} : ${error.response.data}`);
        } else {
          console.error(error.message);
        }
      });
  }, []);

  /**
   * Filter products depending on search keyword and search criteria.
   */
  useEffect(() => {
    const result = products.filter((product) =>
      searchBy === "ScrumMaster"
        ? product.scrumMasterName.toLowerCase().includes(search.toLowerCase())
        : product.developers
            .map((developer) =>
              developer.toLowerCase().includes(search.toLowerCase())
            )
            .includes(true)
    );
    setFilteredProduct(result);
  }, [products, search, searchBy]);

  /**
   * This function sends a new product to the backend API to create.
   * If error occurrs while creating the new product, error will be logged.
   */
  const createProduct = (newProduct: Omit<Product, "productId">) => {
    axios
      .post("/products", newProduct)
      .then((res: AxiosResponse<Product>) => {
        if (res.status !== 201) {
          throw new Error("Error occurred while creating a product.");
        }
        setProducts((prev) => [...prev, res.data]);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error(`${error.response.status} : ${error.response.data}`);
        } else {
          console.error(error.message);
        }
      });
  };

  /**
   * This function sends an updated product to the backend API to update.
   * If error occurrs while updating the product, error will be logged.
   */
  const updateProduct = (updatedProduct: Product) => {
    axios
      .put("/products", updatedProduct)
      .then((res: AxiosResponse<Product>) => {
        if (res.status !== 200)
          throw new Error("Error occurred while updating a product.");

        setProducts((prev) =>
          prev.map((product) =>
            product.productId === res.data.productId ? res.data : product
          )
        );
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error(`${error.response.status} : ${error.response.data}`);
        } else {
          console.error(error.message);
        }
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        createProduct,
        updateProduct,
        search,
        setSearch,
        searchBy,
        setSearchBy,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
