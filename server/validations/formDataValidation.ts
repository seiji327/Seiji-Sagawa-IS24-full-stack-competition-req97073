import { ProductReqBody } from "../types/types";

/**
 *  This function validates the form data passed in as a request body and
 *  returns whether the data is valid or not.
 *
 *  All input fields except developer name fields that need to be filled
 *  at least one developer must be filled in order to proceed.
 */
export const validateFormData = (formData: ProductReqBody): boolean => {
  let isValid = true;

  Object.values(formData).forEach((value) => {
    // Check at least one developer field is filled.
    if (typeof value === "object" && Array.isArray(value)) {
      if (!value.length) isValid = false;
    } else if (typeof value === "string") {
      if (value.trimEnd() === "") isValid = false;
    }
  });

  return isValid;
};
