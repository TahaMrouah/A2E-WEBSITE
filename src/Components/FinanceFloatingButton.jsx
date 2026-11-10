import { Link } from "react-router-dom";
import { FaCalculator } from "react-icons/fa";
import "../Style/financeFloatingButton.css";

export default function FinanceFloatingButton() {
  return (
    <Link
      to="/financer-mon-bien"
      className="finance-floating-button"
      aria-label="Simuler mon financement immobilier"
      title="Financer mon bien"
    >
      <FaCalculator />
    </Link>
  );
}