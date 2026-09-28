import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../Style/scrollBtn.css";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Retour en haut"
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTopButton;