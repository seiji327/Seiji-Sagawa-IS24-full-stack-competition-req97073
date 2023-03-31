import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>IMB Product List</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
