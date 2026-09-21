import { Routes, Route } from "react-router-dom";
import About from "./Views/About";
import Navb from "./Components/Nav";
import Footer from "./Components/Footer";
import Contact from "./Views/Contact";
import Home from "./Components/Hero";
import Offre from "./Components/Offers";
import Service from "./Components/Service";
import Expertise from "./Components/Expertise";
import Properties from "./Views/Properties";
import PropertyDetails from "./Views/PropertyDetails";

function App() {
  return (
    <>
      <Navb />

      <Routes>
        {/* Main Dashboard */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Offre />
              <Service />
              <Expertise />
            </>
          }
        />

        {/* Individual pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/offres" element={<Offre />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/offres/:id" element={<Offre />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;


    

