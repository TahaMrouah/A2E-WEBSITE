
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
  FaHome,
  FaBuilding,
  FaTools,
  FaChartLine,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useProperties from "../hooks/useProperties";

function Navb() {
  const [expanded, setExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
const searchRef = useRef(null);
const searchInputRef = useRef(null);
  
  const navigate = useNavigate();

  const { properties = [], loading } = useProperties();

  const closeNavbar = () => {
    setExpanded(false);
    setSearchOpen(false);
    setSearch("");
  };
const location = useLocation();

const handleSectionNavigation = (event, sectionId) => {
  event.preventDefault();
  closeNavbar();

  if (location.pathname === "/") {
    // Already on the landing page: scroll directly.
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    return;
  }

  // On another page: return home, then scroll to the section.
  navigate("/", {
    state: { scrollToSection: sectionId },
  });
};
useEffect(() => {
  if (searchOpen) {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }
}, [searchOpen]);
useEffect(() => {
  const sectionId = location.state?.scrollToSection;

  if (location.pathname !== "/" || !sectionId) return;

  // Wait for the landing page to render before scrolling.
  const timer = setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Clear the pending scroll request.
    navigate("/", {
      replace: true,
      state: null,
    });
  }, 150);

  return () => clearTimeout(timer);
}, [location.pathname, location.state, navigate]);
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

  const dropdownTitle = (label) => (
    <span className="partner-dropdown-title">
      {label}
      <FaChevronDown className="partner-chevron" />
    </span>
  );

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

            {/* DISCOVER A2E DROPDOWN */}
            <NavDropdown
              title={dropdownTitle("Découvrir A2E")}
              id="discover-dropdown"
              className="partner-dropdown discover-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/#services"
                className="partner-dropdown-item"
                onClick={closeNavbar}
                onClick={(event) =>
    handleSectionNavigation(event, "services")
  }
              >
                <span className="partner-icon">
                  <FaTools />
                </span>

                <span className="partner-item-text">
                  <strong>Nos Services</strong>
                  <small>
                    Découvrez nos solutions immobilières
                  </small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/#offres"
                className="partner-dropdown-item"
                onClick={closeNavbar}
                 onClick={(event) =>
    handleSectionNavigation(event, "offres")
  }
                
              >
                <span className="partner-icon">
                  <FaBuilding />
                </span>

                <span className="partner-item-text">
                  <strong>Nos Offres</strong>
                  <small>
                    Explorez nos biens immobiliers
                  </small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/#expertise"
                className="partner-dropdown-item"
                onClick={closeNavbar}
                onClick={(event) =>
    handleSectionNavigation(event, "expertise")
  }
              >
                <span className="partner-icon">
                  <FaChartLine />
                </span>

                <span className="partner-item-text">
                  <strong>Notre Expertise</strong>
                  <small>
                    Notre savoir-faire à votre service
                  </small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/properties"
                className="partner-dropdown-item"
                onClick={closeNavbar}
              >
                <span className="partner-icon">
                  <FaHome />
                </span>

                <span className="partner-item-text">
                  <strong>Nos Propriétés</strong>
                  <small>
                    Trouvez votre prochain bien
                  </small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>
            </NavDropdown>
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
            <Nav.Link
              as={Link}
              to="/projects"
              className="link"
              onClick={closeNavbar}
            >
              Nos Projets
            </Nav.Link>

            {/* PARTNERS DROPDOWN */}
            <NavDropdown
              title={dropdownTitle("Espace partenaires")}
              id="partner-dropdown"
              className="partner-dropdown"
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
                  <small>
                    Confiez-nous votre bien immobilier
                  </small>
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
                  <small>
                    Explorez vos solutions de financement
                  </small>
                </span>

                <FaArrowRight className="partner-item-arrow" />
              </NavDropdown.Item>
            </NavDropdown>

            
{/* PROPERTY SEARCH — FLOATING PANEL */}
<div
  className={`navbar-search ${searchOpen ? "search-open" : ""}`}
  ref={searchRef}
>
  <button
    type="button"
    className="search-button"
    aria-label="Ouvrir la recherche"
    aria-expanded={searchOpen}
    onClick={() => {
      setSearchOpen((open) => !open);
      setSearch("");
    }}
  >
    {searchOpen ? <FaTimes /> : <FaSearch />}
  </button>

  {searchOpen && (
    <div className="search-popup">
      <div className="search-popup-heading">
        <div>
          <span className="search-eyebrow">A2E IMMOBILIER</span>
          <h3>Quel bien recherchez-vous ?</h3>
          <p>Trouvez le bien qui correspond à votre projet.</p>
        </div>

        <button
          type="button"
          className="search-popup-close"
          aria-label="Fermer la recherche"
          onClick={() => {
            setSearchOpen(false);
            setSearch("");
          }}
        >
          <FaTimes />
        </button>
      </div>

      <form
        className="navbar-search-form"
        onSubmit={handleSearchSubmit}
      >
        <FaSearch className="search-popup-input-icon" />

        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Villa, appartement, Casablanca..."
          autoComplete="off"
          aria-label="Rechercher un bien immobilier"
        />

        {search && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setSearch("")}
            aria-label="Effacer la recherche"
          >
            <FaTimes />
          </button>
        )}

        <button type="submit" className="search-submit">
          Rechercher
        </button>
      </form>

      {!search.trim() ? (
        <div className="search-suggestions">
          <span className="search-section-label">
            RECHERCHES POPULAIRES
          </span>

          <div className="search-chips">
            {[
              "Villa",
              "Appartement",
              "Bureau",
              "Local commercial",
            ].map((term) => (
              <button
                type="button"
                className="search-chip"
                key={term}
                onClick={() => {
                  setSearch(term);
                  searchInputRef.current?.focus();
                }}
              >
                {term}
                <FaArrowRight />
              </button>
            ))}
          </div>

          <div className="search-help">
            <FaInfoCircle />
            <span>
              Conseil : recherchez par type de bien, ville,
              quartier ou identifiant.
            </span>
          </div>
        </div>
      ) : (
        <div className="search-results">
          {loading ? (
            <div className="search-message">
              Chargement des propriétés...
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                <span>Biens correspondants</span>
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
                    <small>
                      {property.type || "Bien immobilier"}
                      {" · "}
                      Réf. {property._id}
                    </small>
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
                Essayez un autre type de bien, une autre
                localisation ou un identifiant.
              </span>
              <button
                type="button"
                className="search-reset"
                onClick={() => setSearch("")}
              >
                Voir les suggestions
              </button>
            </div>
          )}
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
              <FaEnvelope className="nav-contact-icon" />
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
