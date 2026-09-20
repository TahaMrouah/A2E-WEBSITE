import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Style/navbar.css";
import { Link } from "react-router-dom";
function Navb() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar"
    >
      <Container>

        <Navbar.Brand
        as={Link}
          to="/"
          className="link navbar-brand"
        >
          A2E <span>Immobilier</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler"
        />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto navbar-links">
            <Nav.Link as={Link} to="/" className="link">
              Accueil
            </Nav.Link>

            <Nav.Link href="#services" className="link">
              Nos Services
            </Nav.Link>

            <Nav.Link href="#offres" className="link">
              Nos Offres
            </Nav.Link>
            <Nav.Link href="#expertise" className="link">
              Notre Expertise
            </Nav.Link>
          </Nav>

          <Nav className="navbar-right">

            <Nav.Link as={Link} to="/about" className="link">
              A Propos
            </Nav.Link>

            <Nav.Link as={Link}
              eventKey={2}
              to="/contact"
              className="link contact-link"
            >
              Contact
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;