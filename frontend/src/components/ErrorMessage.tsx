import FormText from "react-bootstrap/FormText";

type Props = {
  propertyKey: string;
  errors: Record<string, string>;
};

const ErrorMessage = ({ propertyKey, errors }: Props) => {
  return (
    <>
      {propertyKey in errors ? (
        <FormText className="text-danger">
          <b>{errors[propertyKey]}</b>
        </FormText>
      ) : null}
    </>
  );
};

export default ErrorMessage;
