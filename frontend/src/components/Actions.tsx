import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import ProductModal from "./ProductModal";
import useProductContext from "../hooks/useProductContext";
import { SearchBy } from "../types/types";

const Actions = () => {
  const [show, setShow] = useState(false);

  const radios: { value: SearchBy }[] = [
    { value: "ScrumMaster" },
    { value: "Developer" },
  ];

  const { search, setSearch, searchBy, setSearchBy } = useProductContext();

  return (
    <Container className="my-3">
      <Row>
        <Col sm={6}>
          <div className="position-relative">
            <FormControl
              type="text"
              placeholder={`Search by ${searchBy} name`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="position-absolute top-0 end-0"
              variant=""
              onClick={() => setSearch("")}
            >
              &#10005;
            </Button>
          </div>
        </Col>
        <Col sm={4}>
          <ButtonGroup>
            {radios.map((radio, index) => (
              <ToggleButton
                key={index}
                id={`radio-${index}`}
                type="radio"
                variant={index % 2 ? "outline-success" : "outline-danger"}
                value={radio.value}
                checked={searchBy === radio.value}
                onChange={(e) => setSearchBy(e.currentTarget.value as SearchBy)}
              >
                {radio.value}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col sm={2}>
          <Button onClick={() => setShow(true)} variant="outline-primary">
            Add Product
          </Button>
        </Col>
      </Row>
      {show && (
        <ProductModal
          show={show}
          handleClose={() => setShow(false)}
          mode="add"
        />
      )}
    </Container>
  );
};

export default Actions;
