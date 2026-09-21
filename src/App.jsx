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
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import AdminProperties from "./Admin/Properties";
import PropertyForm from "./Admin/PropertyForm";
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
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route
          path="/admin/properties/new"
          element={<PropertyForm />}
        />

        <Route
          path="/admin/properties/:id/edit"
          element={<PropertyForm />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;




