
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../Style/navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import useProperties from "../hooks/useProperties";

function Navb() {
  const [expanded, setExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [projectUnits, setProjectUnits] = useState([]);
  const [projectUnitsLoading, setProjectUnitsLoading] = useState(false);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { properties = [], loading } = useProperties();

  const closeNavbar = () => {
    setExpanded(false);
    setSearchOpen(false);
    setSearch("");
  };

  // Normalize accents, uppercase/lowercase and surrounding spaces.
  const normalizeText = (value) =>
    String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Collect searchable values from all fields, including nested objects.
  const getSearchableText = (value) => {
    if (value === null || value === undefined) return "";

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value.map(getSearchableText).join(" ");
    }

    if (typeof value === "object") {
      return Object.entries(value)
        .filter(
          ([key]) =>
            !/image|buffer|base64|binary|password|token/i.test(key)
        )
        .map(
          ([key, fieldValue]) =>
            `${key} ${getSearchableText(fieldValue)}`
        )
        .join(" ");
    }

    return "";
  };

  // Allow searches such as "bureau 500 m2" to match separate fields.
  const matchesSearch = (text, query) => {
    const normalizedText = normalizeText(text);
    const terms = normalizeText(query).split(/\s+/).filter(Boolean);

    return terms.every((term) => normalizedText.includes(term));
  };

  const handleSectionNavigation = (event, sectionId) => {
    event.preventDefault();
    closeNavbar();

    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate("/", {
      state: { scrollToSection: sectionId },
    });
  };

  // Fetch offices and commercial units from the projects API.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjectUnits() {
      setProjectUnitsLoading(true);

      try {
        const response = await fetch(
          "https://api.a2eimmo.ma/api/projects",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Projects API error: ${response.status}`);
        }

        const data = await response.json();

        const units = Array.isArray(data)
          ? data
          : Array.isArray(data.projects)
            ? data.projects
            : Array.isArray(data.data)
              ? data.data
              : [];

        setProjectUnits(units);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Could not load offices and commercial units:",
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setProjectUnitsLoading(false);
        }
      }
    }

    fetchProjectUnits();

    return () => controller.abort();
  }, []);

  // Focus the input whenever the search panel opens.
  useEffect(() => {
    if (!searchOpen) return;

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [searchOpen]);

  // Handle section navigation when returning to the landing page.
  useEffect(() => {
    const sectionId = location.state?.scrollToSection;

    if (location.pathname !== "/" || !sectionId) return;

    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      navigate("/", {
        replace: true,
        state: null,
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  // Close the search panel when clicking outside it.
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

  // Classify project units without assigning unknown units to the wrong project.
  const normalizeProjectSearchItem = (unit) => {
    const reference = String(unit.reference || unit.id || "");
    const project = String(unit.project || "");
    const category = String(unit.category || "");

    const referenceText = normalizeText(reference);
    const categoryText = normalizeText(category);
    const projectText = normalizeText(project);

    const isCommercial =
      referenceText.startsWith("lot commercial") ||
      referenceText.startsWith("cc-") ||
      categoryText.includes("commercial") ||
      categoryText.includes("magasin") ||
      categoryText.includes("local") ||
      projectText.includes("central hills");

    const isOffice =
      referenceText.startsWith("bureau building") ||
      referenceText.startsWith("bureau ") ||
      referenceText.startsWith("bb-") ||
      categoryText.includes("bureau") ||
      categoryText.includes("office") ||
      projectText.includes("green lotus");

    // Central Hills = commercial units.
    // Green Lotus = offices.
    let projectKey = "unknown";

    if (isCommercial) {
      projectKey = "central";
    } else if (isOffice) {
      projectKey = "green";
    }

    const projectName =
      projectKey === "central"
        ? "Central Hills"
        : projectKey === "green"
          ? "Green Lotus"
          : project || "Projet immobilier";

    const unitType = isCommercial
      ? "Local commercial"
      : isOffice
        ? "Bureau"
        : category || "Lot immobilier";

    const searchText = normalizeText(
      getSearchableText({
        ...unit,
        reference,
        projectName,
        unitType,
      })
    );

    return {
      ...unit,
      reference,
      projectKey,
      projectName,
      unitType,
      searchText,
    };
  };

  const searchableProjectUnits = useMemo(
    () => projectUnits.map(normalizeProjectSearchItem),
    [projectUnits]
  );

  // Combine property listings, offices and commercial units in one search.
  const searchResults = useMemo(() => {
    const query = search.trim();

    if (!query) return [];

    const propertyResults = properties
      .map((property) => {
        const reference = String(
          property.reference ||
            property.ref ||
            property._id ||
            ""
        );

        return {
          kind: "property",
          item: property,
          title: property.title || property.name || "Bien immobilier",
          location:
            property.location ||
            property.subheader ||
            property.address ||
            "Localisation non renseignée",
          type: property.type || property.category || "Bien immobilier",
          reference,
          searchText: normalizeText(
            getSearchableText({
              ...property,
              reference,
            })
          ),
        };
      })
      .filter((result) => matchesSearch(result.searchText, query));

    const unitResults = searchableProjectUnits
      .map((unit) => ({
        kind: "projectUnit",
        item: unit,
        title: unit.reference || "Lot sans référence",
        location: unit.projectName,
        type: unit.unitType,
        reference: unit.reference,
        projectName: unit.projectName,
        projectKey: unit.projectKey,
        searchText: unit.searchText,
      }))
      .filter((result) => matchesSearch(result.searchText, query));

    return [...propertyResults, ...unitResults].slice(0, 10);
  }, [search, properties, searchableProjectUnits]);

  // Open the correct destination for each result type.
  const openSearchResult = (result) => {
    if (result.kind === "property") {
      const propertyId = result.item._id || result.item.id;

      if (propertyId) {
        navigate(`/properties/${propertyId}`);
      } else {
        navigate("/properties");
      }
    } else if (result.kind === "projectUnit") {
      if (result.projectKey === "central") {
        navigate("/projects#central-hills");
      } else if (result.projectKey === "green") {
        navigate("/projects#green-lotus");
      } else {
        navigate("/projects");
      }
    }

    closeNavbar();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    if (searchResults.length === 1) {
      openSearchResult(searchResults[0]);
      return;
    }

    if (
      searchResults.length > 0 &&
      searchResults.every((result) => result.kind === "property")
    ) {
      navigate("/properties");
      closeNavbar();
      return;
    }

    if (
      searchResults.length > 0 &&
      searchResults.every((result) => result.kind === "projectUnit")
    ) {
      const projectKeys = new Set(
        searchResults.map((result) => result.projectKey)
      );

      if (projectKeys.size === 1 && projectKeys.has("central")) {
        navigate("/projects#central-hills");
      } else if (projectKeys.size === 1 && projectKeys.has("green")) {
        navigate("/projects#green-lotus");
      } else {
        navigate("/projects");
      }

      closeNavbar();
    }

    // Mixed results remain in the popup so the user can choose.
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
                      <span className="search-eyebrow">
                        A2E IMMOBILIER
                      </span>
                      <h3>Quel bien recherchez-vous ?</h3>
                      <p>
                        Trouvez le bien qui correspond à votre projet.
                      </p>
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
                      placeholder="Villa, bureau, référence, prix..."
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
                          Recherchez par type, référence, projet,
                          localisation, surface ou prix.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="search-results">
                      {loading && projectUnitsLoading ? (
                        <div className="search-message">
                          Chargement des résultats...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="search-results-header">
                            <span>Biens correspondants</span>
                            <span>{searchResults.length}</span>
                          </div>

                          {searchResults.map((result, index) => (
                            <button
                              key={`${result.kind}-${result.reference || index}`}
                              type="button"
                              className="search-result"
                              onClick={() => openSearchResult(result)}
                            >
                              <div className="search-result-content">
                                <strong>{result.title}</strong>

                                <span>{result.location}</span>

                                <small>
                                  {result.type}
                                  {result.reference
                                    ? ` · Réf. ${result.reference}`
                                    : ""}
                                  {result.kind === "projectUnit"
                                    ? ` · ${result.projectName}`
                                    : ""}
                                </small>
                              </div>

                              <FaArrowRight />
                            </button>
                          ))}

                          {searchResults.some(
                            (result) => result.kind === "property"
                          ) && (
                            <Link
                              to="/properties"
                              className="search-see-all"
                              onClick={closeNavbar}
                            >
                              Voir toutes les propriétés
                              <FaArrowRight />
                            </Link>
                          )}

                          {searchResults.some(
                            (result) => result.kind === "projectUnit"
                          ) && (
                            <Link
                              to="/projects"
                              className="search-see-all"
                              onClick={closeNavbar}
                            >
                              Voir tous les bureaux et locaux
                              <FaArrowRight />
                            </Link>
                          )}
                        </>
                      ) : (
                        <div className="search-no-results">
                          <FaSearch />
                          <strong>Aucun bien trouvé</strong>
                          <span>
                            Essayez une autre référence, un autre
                            type de bien ou une localisation différente.
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
