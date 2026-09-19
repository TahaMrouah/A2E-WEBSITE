import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Style/navbar.css'
function Navb() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home"className='link' style={{color:"#fff"}}>A2E Immobilier</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='link'style={{color:"#fff"}}>Accueil</Nav.Link>
            <Nav.Link href="#service" className='link'style={{color:"#fff"}}>Nos Service</Nav.Link>
            <Nav.Link href="#blogs" className='link'style={{color:"#fff"}}>Offre</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#Location"className='link' style={{color:"#fff"}}>Localisation</Nav.Link>
            <Nav.Link eventKey={2} className='link'href="#contact" style={{color:"#fff"}}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;