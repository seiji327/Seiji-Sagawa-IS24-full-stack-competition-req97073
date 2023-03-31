import { useState } from "react";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import ProductModal from "./ProductModal";
import useProductContext from "../hooks/useProductContext";

const ProductList = () => {
  const { products, filteredProducts } = useProductContext();
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleEditClick = (index: number) => {
    setSelectedIndex(index);
    setShow(true);
  };

  return (
    <Container className="my-4">
      <h5>
        <b>{filteredProducts.length}</b>
        {filteredProducts.length > 1 ? " products" : " product"} at IMB
      </h5>
      <div className="overflow-auto" style={{ height: "75vh" }}>
        {filteredProducts.length ? (
          <Table striped bordered hover>
            <thead className="bg-light sticky-top top-0">
              <tr>
                <th>#</th>
                <th>Product Number</th>
                <th>Product Name</th>
                <th>Scrum Master</th>
                <th>Product Owner</th>
                <th>Developer(s)</th>
                <th>Start Date</th>
                <th>Methodology</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.scrumMasterName}</td>
                  <td>{product.productOwnerName}</td>
                  <td>
                    <ul>
                      {product.developers.map((developer, index) => (
                        <li key={index}>{developer}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{product.startDate}</td>
                  <td>{product.methodology}</td>
                  <td valign="middle" align="center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleEditClick(index)}
                    >
                      EDIT
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No data to display</p>
        )}
      </div>

      {show && (
        <ProductModal
          show={show}
          handleClose={() => setShow(false)}
          mode="edit"
          product={filteredProducts[selectedIndex]}
        />
      )}
    </Container>
  );
};

export default ProductList;
