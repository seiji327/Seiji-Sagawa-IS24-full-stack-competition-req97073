export type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  createProduct: (newProduct: Omit<Product, "productId">) => void;
  updateProduct: (updatedProduct: Product) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchBy: SearchBy;
  setSearchBy: React.Dispatch<React.SetStateAction<SearchBy>>;
  filteredProducts: Product[];
};

export type Product = {
  productId: string;
  productName: string;
  productOwnerName: string;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
  developers: string[];
};

export type FormData = Omit<Product, "productId" | "developers"> & {
  developers: Record<string, string>;
};

export type SearchBy = "ScrumMaster" | "Developer";

export type ModalMode = "add" | "edit";
