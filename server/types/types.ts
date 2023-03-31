export type Product = {
  productId: string | null;
  productName: string;
  productOwnerName: string;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
  developers: string[];
};

export type ProductReqBody = Omit<Product, "productId">;

export type Data = {
  products: Product[];
  setProducts: (data: Product[]) => void;
};
