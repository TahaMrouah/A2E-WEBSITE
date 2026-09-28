import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Style/navbar.css";
import { Link } from "react-router-dom";

function Navb() {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>

        {/* LOGO */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="link navbar-brand"
          onClick={closeNavbar}
        >
          A2E <span>Immobilier</span>
        </Navbar.Brand>

        {/* MOBILE BUTTON */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">

          {/* LEFT LINKS */}
          <Nav className="me-auto navbar-links">

            <Nav.Link
              as={Link}
              to="/"
              className="link"
              onClick={closeNavbar}
            >
              Accueil
            </Nav.Link>

            <Nav.Link
              href="#services"
              className="link"
              onClick={closeNavbar}
            >
              Nos Services
            </Nav.Link>

            <Nav.Link
              href="#offres"
              className="link"
              onClick={closeNavbar}
            >
              Nos Offres
            </Nav.Link>

            <Nav.Link
              href="#expertise"
              className="link"
              onClick={closeNavbar}
            >
              Notre Expertise
            </Nav.Link>

          </Nav>

          {/* RIGHT LINKS */}
          <Nav className="navbar-right">

            <Nav.Link
              as={Link}
              to="/about"
              className="link"
              onClick={closeNavbar}
            >
              A Propos
            </Nav.Link>

            <Nav.Link
              as={Link}
              eventKey={2}
              to="/contact"
              className="link contact-link"
              onClick={closeNavbar}
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