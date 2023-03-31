import { useContext } from "react";

import { ProductContext } from "../context/ProductContext";
import { ProductContextType } from "../types/types";

const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);

  if (context === null) {
    throw new Error("Context is being used outside of provider.");
  }
  return context;
};

export default useProductContext;
