import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useProductContext from "../hooks/useProductContext";
import { Product, FormData, ModalMode } from "../types/types";
import ErrorMessage from "./ErrorMessage";
import { validateFormData } from "../validations/formDataValidation";

type Props = {
  show: boolean;
  mode: ModalMode;
  product?: Product;
  handleClose: () => void;
};

const ProductModal = ({ show, mode, product, handleClose }: Props) => {
  const { createProduct, updateProduct } = useProductContext();

  /**
   *   This variable holds an object of 5 developer names.
   */
  const developerNames: Record<string, string> = Array.from(Array(5)).reduce(
    (prev, _, index) => ({
      ...prev,
      [`developer${index + 1}`]: product?.developers[index] || "",
    }),
    0
  );

  /**
   *   This state variable holds an object of all form field data.
   *   If the mode is edit mode, form data will be filled with the values of product passed in.
   */
  const [formData, setFormData] = useState<FormData>({
    productName: product?.productName || "",
    productOwnerName: product?.productOwnerName || "",
    scrumMasterName: product?.scrumMasterName || "",
    startDate: product?.startDate.replaceAll("/", "-") || "",
    methodology: product?.methodology || "Agile",
    developers: developerNames,
  });

  /**
   *   This state variable holds an object of form input error(s).
   *
   *   Key of the object will be the key of the formData, and
   *   value will be an appropriate error message to be displayed under
   *   corresponding input field.
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   *   This function handles the input change of the form data.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("developer")) {
      setFormData((prev) => ({
        ...prev,
        developers: { ...prev.developers, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   *   This function handles the change of the select element.
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   *   This function handles the save button click of the form.
   *
   *   The function first checks whether the form data is valid or not.
   *   Only when the form data is valid, it proceeds to create or update
   *   functions.
   *
   *   If the form data is invalid, data will not be processed.
   */
  const handleSave = () => {
    setErrors({});

    let isValid = validateFormData(formData, setErrors);

    if (isValid) {
      //This block of code converts object to array that will be sent to backend
      const developers = Object.values(formData.developers).filter(
        (developer) => developer.trimEnd() !== "" && developer
      );

      const formattedDate = formData.startDate.replaceAll("-", "/");

      //**********CREATE A NEW PRODUCT***********
      if (mode === "add") {
        const newProduct = {
          ...formData,
          startDate: formattedDate,
          developers: developers,
        };
        createProduct(newProduct);
      }

      //**********UPDATE A PRODUCT***********
      else {
        const updatedProduct = {
          ...formData,
          productId: product?.productId,
          startDate: formattedDate,
          developers: developers,
        };
        updateProduct(updatedProduct as Product);
      }

      handleClose();
    }
  };

  /**
   *   This variable holds an array of 5 developer input fields.
   */
  const developerInputFields = Object.entries(formData.developers).map(
    ([key, value], index) => (
      <Row key={key} className="align-items-baseline">
        <Col>{index + 1}</Col>
        <Col sm={11}>
          <Form.Control
            type="text"
            placeholder="Enter developer's name"
            className="mb-3"
            name={key}
            onChange={handleChange}
            value={value}
          />
        </Col>
      </Row>
    )
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode.toUpperCase()} Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/************ PRODUCT NAME *************/}
          <Form.Group className="mb-4">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
            <ErrorMessage propertyKey="productName" errors={errors} />
          </Form.Group>

          {/************ SCRUM MASTER NAME *************/}
          <Form.Group className="mb-4">
            <Form.Label>Scrum Master</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter scrum master's name"
              name="scrumMasterName"
              value={formData.scrumMasterName}
              onChange={handleChange}
            />
            <ErrorMessage propertyKey="scrumMasterName" errors={errors} />
          </Form.Group>

          {/************ PRODUCT OWNER NAME *************/}
          <Form.Group className="mb-4">
            <Form.Label>Product Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product owner's name"
              name="productOwnerName"
              value={formData.productOwnerName}
              onChange={handleChange}
            />
            <ErrorMessage propertyKey="productOwnerName" errors={errors} />
          </Form.Group>

          {/************ DEVELOPER NAMES *************/}
          <Form.Group className="mb-4">
            <Form.Label>
              Developer Names
              <Form.Text className="text-muted">(Up to 5)</Form.Text>
            </Form.Label>
            {developerInputFields}
            <ErrorMessage propertyKey="developers" errors={errors} />
          </Form.Group>

          {/************ START DATE *************/}
          <Form.Group className="mb-4">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <ErrorMessage propertyKey="startDate" errors={errors} />
          </Form.Group>

          {/************ METHODOLOGY *************/}
          <Form.Group className="mb-4">
            <Form.Label>Methodology</Form.Label>
            <Form.Select
              aria-label="Select methodology"
              name="methodology"
              onChange={handleSelectChange}
              defaultValue={formData.methodology}
            >
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-evenly">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
