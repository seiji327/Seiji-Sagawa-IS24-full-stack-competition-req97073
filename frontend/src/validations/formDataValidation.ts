import { FormData } from "../types/types";

/**
 *   This function validates form data  and returns whether the data is valid or not.
 *
 *   All input fields except developer name fields that need to be filled
 *   at least one developer must be filled in order to proceed to either
 *   create or update a product.
 *
 *   If there is an invalid field, the field name and its corresponding error
 *   message will be set to be displayed.
 */

export const validateFormData = (
  formData: FormData,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): boolean => {
  let isValidFormData = true;

  Object.entries(formData).forEach(([key, value]) => {
    const isDeveloperFields = typeof value === "object";

    let isValidField = isDeveloperFields
      ? validateDeveloperFields(value)
      : value.trimEnd() !== ""
      ? true
      : false;

    if (!isValidField) {
      setErrors((prev) => ({
        ...prev,
        [key]: isDeveloperFields
          ? "At least 1 field must be filled"
          : "This field must be filled",
      }));
      isValidFormData = false;
    }
  });

  return isValidFormData;
};

/**
 *   This function checks to see at least one developer name input
 *   field is filled.
 *
 *   It returns whether at least one developer name field
 *   is filled or not.
 */
const validateDeveloperFields = (
  developers: Pick<FormData, "developers">["developers"]
): boolean => {
  let hasValue = false;
  Object.values(developers).forEach((developer) => {
    if (developer.trimEnd() !== "") hasValue = true;
  });

  return hasValue;
};
