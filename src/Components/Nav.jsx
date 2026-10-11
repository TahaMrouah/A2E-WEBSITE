
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../Style/navbar.css";
import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaTimes,
  FaArrowRight,
  FaHandshake,
  FaCoins,
  FaChevronDown,
} from "react-icons/fa";

import useProperties from "../hooks/useProperties";

function Navb() {
  const [expanded, setExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { properties, loading } = useProperties();

  const closeNavbar = () => {
    setExpanded(false);
    setSearchOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return properties
      .filter((property) => {
        const title = String(property.title || "").toLowerCase();
        const location = String(
          property.location || property.subheader || ""
        ).toLowerCase();
        const id = String(property._id || "").toLowerCase();
        const type = String(property.type || "").toLowerCase();

        return (
          title.includes(query) ||
          location.includes(query) ||
          id.includes(query) ||
          type.includes(query)
        );
      })
      .slice(0, 6);
  }, [search, properties]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    if (searchResults.length === 1) {
      navigate(`/properties/${searchResults[0]._id}`);
    } else {
      navigate("/properties");
    }

    closeNavbar();
  };

  const openProperty = (property) => {
    navigate(`/properties/${property._id}`);
    closeNavbar();
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
        <Navbar.Brand
          as={Link}
          to="/"
          className="link navbar-brand"
          onClick={closeNavbar}
        >
          A2E <span>Immobilier</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler"
          aria-label="Ouvrir le menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
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
              href="/#services"
              className="link"
              onClick={closeNavbar}
            >
              Nos Services
            </Nav.Link>

            <Nav.Link
              href="/#offres"
              className="link"
              onClick={closeNavbar}
            >
              Nos Offres
            </Nav.Link>

            <Nav.Link
              href="/#expertise"
              className="link"
              onClick={closeNavbar}
            >
              Notre Expertise
            </Nav.Link>
          </Nav>

          <Nav className="navbar-right">
            <Nav.Link
              as={Link}
              to="/about"
              className="link"
              onClick={closeNavbar}
            >
              À propos
            </Nav.Link>

            {/* PREMIUM PARTNER DROPDOWN */}
            <NavDropdown
              title={
                <span className="partner-dropdown-title">
                  Espace partenaires
                  <FaChevronDown className="partner-chevron" />
                </span>
              }
              id="partner-dropdown"
              className="partner-dropdown"
              onClick={(event) => {
                // On mobile, close after choosing a destination.
                if (event.target.closest(".partner-dropdown-item")) {
                  closeNavbar();
                }
              }}
            >
              <NavDropdown.Item
                as={Link}
                to="/collaboration"
                className="partner-dropdown-item"
                onClick={closeNavbar}
              >
                <span className="partner-icon">
                  <FaHandshake />
                </span>

                <span className="partner-item-text">
                  <strong>Collaborer avec A2E</strong>
                  <small>Confiez-nous votre bien immobilier</small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/financer-mon-bien"
                className="partner-dropdown-item"
                onClick={closeNavbar}
              >
                <span className="partner-icon">
                  <FaCoins />
                </span>

                <span className="partner-item-text">
                  <strong>Financer mon bien</strong>
                  <small>Explorez vos solutions de financement</small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>
            </NavDropdown>

            {/* SEARCH */}
            <div
              className={`navbar-search ${
                searchOpen ? "search-open" : ""
              }`}
              ref={searchRef}
            >
              <form
                className="navbar-search-form"
                onSubmit={handleSearchSubmit}
              >
                <button
                  type="button"
                  className="search-button"
                  aria-label="Rechercher"
                  onClick={() => setSearchOpen(true)}
                >
                  <FaSearch />
                </button>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Rechercher un bien..."
                  autoComplete="off"
                />

                {search.length > 0 && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={() => setSearch("")}
                    aria-label="Effacer"
                  >
                    <FaTimes />
                  </button>
                )}
              </form>

              {searchOpen && search.trim() && (
                <div className="search-results">
                  {loading ? (
                    <div className="search-message">Chargement...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="search-results-header">
                        <span>Résultats</span>
                        <span>{searchResults.length}</span>
                      </div>

                      {searchResults.map((property) => (
                        <button
                          key={property._id}
                          type="button"
                          className="search-result"
                          onClick={() => openProperty(property)}
                        >
                          <div className="search-result-content">
                            <strong>{property.title}</strong>

                            <span>
                              {property.location ||
                                property.subheader ||
                                "Localisation non renseignée"}
                            </span>

                            <small>ID : {property._id}</small>
                          </div>

                          <FaArrowRight />
                        </button>
                      ))}

                      <Link
                        to="/properties"
                        className="search-see-all"
                        onClick={closeNavbar}
                      >
                        Voir toutes les propriétés
                        <FaArrowRight />
                      </Link>
                    </>
                  ) : (
                    <div className="search-no-results">
                      <FaSearch />
                      <strong>Aucun bien trouvé</strong>
                      <span>
                        Recherchez par nom, localisation ou identifiant.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Nav.Link
              as={Link}
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
