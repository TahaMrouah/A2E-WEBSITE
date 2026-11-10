
import { useMemo, useState } from "react";
import {
  FaCalculator,
  FaChartPie,
  FaCoins,
  FaHome,
  FaWallet,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import "../Style/finance.css";

const DEFAULTS = {
  price: 2500000,
  contributionPercent: 35,
  annualRate: 4.5,
  durationYears: 20,
};

const formatDH = (value) =>
  new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatPercent = (value) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

function calculateLoan(principal, annualRate, years) {
  const months = years * 12;

  if (principal <= 0 || months <= 0) {
    return {
      monthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;

  // Handles an interest-free loan without dividing by zero.
  const monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months));

  const totalRepayment = monthlyPayment * months;

  return {
    monthlyPayment,
    totalRepayment,
    totalInterest: Math.max(0, totalRepayment - principal),
  };
}

export default function FinancerMonBien() {
  const [price, setPrice] = useState(DEFAULTS.price);
  const [contributionPercent, setContributionPercent] = useState(
    DEFAULTS.contributionPercent
  );
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [durationYears, setDurationYears] = useState(
    DEFAULTS.durationYears
  );

  const [showSchedule, setShowSchedule] = useState(false);

  const safePrice = Math.min(
    100000000,
    Math.max(0, Number(price) || 0)
  );

  const safeContributionPercent = Math.min(
    100,
    Math.max(0, Number(contributionPercent) || 0)
  );

  const safeAnnualRate = Math.min(
    30,
    Math.max(0, Number(annualRate) || 0)
  );

  const safeDuration = Math.min(
    30,
    Math.max(1, Number(durationYears) || 1)
  );

  const contribution = safePrice * safeContributionPercent / 100;
  const loanAmount = safePrice - contribution;

  const loan = useMemo(
    () =>
      calculateLoan(loanAmount, safeAnnualRate, safeDuration),
    [loanAmount, safeAnnualRate, safeDuration]
  );

  const months = safeDuration * 12;

  // This is an indicative budgeting guideline, not a bank eligibility test.
  const recommendedIncome =
    loan.monthlyPayment > 0 ? loan.monthlyPayment / 0.35 : 0;

  const principalShare =
    loan.totalRepayment > 0
      ? (loanAmount / loan.totalRepayment) * 100
      : 0;

  const interestShare = 100 - principalShare;

  const resetCalculator = () => {
    setPrice(DEFAULTS.price);
    setContributionPercent(DEFAULTS.contributionPercent);
    setAnnualRate(DEFAULTS.annualRate);
    setDurationYears(DEFAULTS.durationYears);
    setShowSchedule(false);
  };

  const amortizationSchedule = useMemo(() => {
    const rows = [];
    const monthlyRate = safeAnnualRate / 100 / 12;
    let remaining = loanAmount;
    let totalInterestPaid = 0;

    for (let year = 1; year <= safeDuration; year += 1) {
      let capitalPaid = 0;
      let interestPaid = 0;

      for (let month = 0; month < 12; month += 1) {
        if (remaining <= 0) break;

        const interest =
          monthlyRate === 0 ? 0 : remaining * monthlyRate;

        const capital = Math.min(
          remaining,
          Math.max(0, loan.monthlyPayment - interest)
        );

        interestPaid += interest;
        capitalPaid += capital;
        remaining = Math.max(0, remaining - capital);
      }

      totalInterestPaid += interestPaid;

      rows.push({
        year,
        capitalPaid,
        interestPaid,
        remaining,
        totalInterestPaid,
      });
    }

    return rows;
  }, [loanAmount, loan.monthlyPayment, safeAnnualRate, safeDuration]);

  const isValidPrice = Number(price) > 0 && Number(price) <= 100000000;

  return (
    <main className="finance-page">
      <section className="finance-hero">
        <div className="finance-hero-overlay" />

        <div className="finance-container finance-hero-content">
          <span className="finance-eyebrow">
            <FaHome aria-hidden="true" />
            A2E IMMOBILIER
          </span>

          <h1>
            Votre projet immobilier,
            <span> mieux financé.</span>
          </h1>

          <p>
            Estimez vos mensualités, évaluez votre apport personnel et
            préparez votre projet immobilier en toute sérénité.
          </p>

          <a className="finance-hero-link" href="#simulateur">
            Simuler mon financement
            <FaArrowRight aria-hidden="true" />
          </a>

          <div className="finance-hero-note">
            <FaInfoCircle aria-hidden="true" />
            Simulation indicative, sans engagement.
          </div>
        </div>
      </section>

      <section className="finance-intro finance-container">
        <span className="finance-section-label">ANTICIPEZ VOTRE ACHAT</span>
        <h2>Donnez vie à votre projet immobilier</h2>
        <p>
          Ajustez votre budget et les paramètres du crédit pour comprendre
          ce que votre financement pourrait représenter chaque mois.
        </p>
      </section>

      <section
        className="finance-simulator finance-container"
        id="simulateur"
      >
        <div className="finance-form-panel">
          <div className="finance-panel-heading">
            <div className="finance-heading-icon">
              <FaCalculator aria-hidden="true" />
            </div>

            <div>
              <span className="finance-section-label">
                VOTRE SIMULATION
              </span>
              <h2>Paramétrez votre crédit</h2>
            </div>
          </div>

          <div className="finance-field">
            <label htmlFor="property-price">
              Prix du bien immobilier
            </label>

            <div className="finance-input-wrap">
              <input
                id="property-price"
                type="number"
                min="1"
                max="100000000"
                step="10000"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                aria-describedby="property-price-help"
              />
              <span>DH</span>
            </div>

            <small id="property-price-help">
              Indiquez le prix d'achat du bien en dirhams.
            </small>

            {!isValidPrice && (
              <small className="finance-error" role="alert">
                Entrez un prix supérieur à 0 DH, jusqu'à 100 000 000 DH.
              </small>
            )}
          </div>

          <div className="finance-field">
            <div className="finance-label-row">
              <label htmlFor="contribution">
                Votre apport personnel
              </label>
              <strong>{safeContributionPercent}%</strong>
            </div>

            <input
              className="finance-range"
              id="contribution"
              type="range"
              min="0"
              max="100"
              step="5"
              value={safeContributionPercent}
              onChange={(event) =>
                setContributionPercent(Number(event.target.value))
              }
              aria-describedby="contribution-help"
            />

            <div className="finance-range-limits">
              <span>0%</span>
              <span>100%</span>
            </div>

            <div className="finance-inline-value">
              <span>Apport estimé</span>
              <strong>{formatDH(contribution)} DH</strong>
            </div>

            <small id="contribution-help">
              La part du prix que vous financez avec vos propres fonds.
            </small>
          </div>

          <div className="finance-field">
            <div className="finance-label-row">
              <label htmlFor="interest-rate">Taux d'intérêt annuel</label>
              <strong>{formatPercent(safeAnnualRate)}%</strong>
            </div>

            <input
              className="finance-range"
              id="interest-rate"
              type="range"
              min="0"
              max="15"
              step="0.25"
              value={safeAnnualRate}
              onChange={(event) =>
                setAnnualRate(Number(event.target.value))
              }
              aria-describedby="interest-help"
            />

            <div className="finance-range-limits">
              <span>0%</span>
              <span>15%</span>
            </div>

            <small id="interest-help">
              Utilisez le taux proposé par votre banque, si vous le connaissez.
            </small>
          </div>

          <div className="finance-field">
            <label htmlFor="loan-duration">Durée du crédit</label>

            <select
              id="loan-duration"
              value={durationYears}
              onChange={(event) =>
                setDurationYears(Number(event.target.value))
              }
            >
              {[5, 7, 10, 12, 15, 20, 25, 30].map((years) => (
                <option key={years} value={years}>
                  {years} ans ({years * 12} mensualités)
                </option>
              ))}
            </select>
          </div>

          <div className="finance-loan-summary">
            <div>
              <span>Montant estimé à emprunter</span>
              <strong>{formatDH(loanAmount)} DH</strong>
            </div>

            <div>
              <span>Apport personnel</span>
              <strong>{formatDH(contribution)} DH</strong>
            </div>
          </div>

          <button
            type="button"
            className="finance-reset"
            onClick={resetCalculator}
          >
            Réinitialiser la simulation
          </button>
        </div>

        <div className="finance-results-panel" aria-live="polite">
          <div className="finance-result-top">
            <span className="finance-result-label">
              VOTRE MENSUALITÉ ESTIMÉE
            </span>
            <div className="finance-monthly">
              {isValidPrice ? formatDH(loan.monthlyPayment) : "—"}
              <span>DH / mois</span>
            </div>
            <p>
              Sur {safeDuration} ans, à un taux annuel fixe de{" "}
              {formatPercent(safeAnnualRate)}%.
            </p>
          </div>

          <div className="finance-result-cards">
            <article className="finance-result-card">
              <div className="finance-card-icon">
                <FaWallet aria-hidden="true" />
              </div>
              <span>Apport personnel</span>
              <strong>{formatDH(contribution)} DH</strong>
            </article>

            <article className="finance-result-card">
              <div className="finance-card-icon">
                <FaCoins aria-hidden="true" />
              </div>
              <span>Intérêts estimés</span>
              <strong>{formatDH(loan.totalInterest)} DH</strong>
            </article>
          </div>

          <div className="finance-total-block">
            <div>
              <span>Montant emprunté</span>
              <strong>{formatDH(loanAmount)} DH</strong>
            </div>
            <div>
              <span>Total remboursé à la banque</span>
              <strong>{formatDH(loan.totalRepayment)} DH</strong>
            </div>
            <div>
              <span>Capital + intérêts + apport</span>
              <strong>
                {formatDH(contribution + loan.totalRepayment)} DH
              </strong>
            </div>
          </div>

          <div className="finance-chart-section">
            <div className="finance-chart-heading">
              <div>
                <FaChartPie aria-hidden="true" />
                <h3>Répartition du remboursement</h3>
              </div>
            </div>

            <div className="finance-chart-content">
              <div
                className="finance-donut"
                role="img"
                aria-label={`Répartition du total remboursé : ${formatPercent(
                  principalShare
                )}% de capital et ${formatPercent(interestShare)}% d'intérêts`}
                style={{
                  background: `conic-gradient(
                    #b89a61 0% ${principalShare}%,
                    #292b28 ${principalShare}% 100%
                  )`,
                }}
              >
                <div className="finance-donut-inner">
                  <span>Coût total</span>
                  <strong>{formatDH(loan.totalRepayment)} DH</strong>
                </div>
              </div>

              <div className="finance-legend">
                <div>
                  <span className="finance-legend-dot finance-dot-capital" />
                  <div>
                    <span>Capital emprunté</span>
                    <strong>{formatDH(loanAmount)} DH</strong>
                  </div>
                </div>

                <div>
                  <span className="finance-legend-dot finance-dot-interest" />
                  <div>
                    <span>Intérêts</span>
                    <strong>{formatDH(loan.totalInterest)} DH</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="finance-income-box">
            <div className="finance-income-icon">
              <FaWallet aria-hidden="true" />
            </div>

            <div>
              <span>Repère budgétaire indicatif</span>
              <strong>
                {formatDH(recommendedIncome)} DH / mois
              </strong>
              <p>
                Revenu net mensuel du foyer qui correspondrait à une mensualité
                représentant 35% du revenu. Ce repère ne garantit pas
                l'acceptation d'un crédit.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="finance-schedule-toggle"
            onClick={() => setShowSchedule((current) => !current)}
            aria-expanded={showSchedule}
          >
            {showSchedule
              ? "Masquer le tableau d'amortissement"
              : "Voir le tableau d'amortissement"}
            <FaArrowRight
              aria-hidden="true"
              className={showSchedule ? "finance-arrow-rotated" : ""}
            />
          </button>

          {showSchedule && (
            <div className="finance-schedule">
              <p>
                Estimation annuelle du remboursement. Les valeurs sont
                indicatives et arrondies.
              </p>

              <div className="finance-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Année</th>
                      <th scope="col">Capital remboursé</th>
                      <th scope="col">Intérêts</th>
                      <th scope="col">Capital restant</th>
                    </tr>
                  </thead>

                  <tbody>
                    {amortizationSchedule.map((row) => (
                      <tr key={row.year}>
                        <th scope="row">{row.year}</th>
                        <td>{formatDH(row.capitalPaid)} DH</td>
                        <td>{formatDH(row.interestPaid)} DH</td>
                        <td>{formatDH(row.remaining)} DH</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="finance-disclaimer finance-container">
        <FaInfoCircle aria-hidden="true" />

        <div>
          <h3>À lire avant de prendre une décision</h3>
          <p>
            Ce simulateur fournit une estimation mathématique à titre
            informatif. Il suppose un taux fixe pendant toute la durée du
            crédit et des mensualités constantes. Il ne tient pas compte de
            l'assurance emprunteur, des frais de dossier, des frais de garantie,
            des frais de notaire, des taxes ni d'autres coûts éventuels.
            Les conditions réelles dépendent notamment de la banque, du dossier
            de l'emprunteur et de l'offre obtenue. A2E Immobilier ne garantit
            ni un taux de crédit ni l'obtention d'un financement.
          </p>
        </div>
      </section>

      <section className="finance-bottom-cta">
        <div className="finance-container">
          <span className="finance-section-label">A2E IMMOBILIER</span>
          <h2>Un projet immobilier en tête ?</h2>
          <p>
            Utilisez cette estimation pour préparer votre budget avant
            d'échanger avec votre banque.
          </p>
          <a href="/properties" className="finance-cta-button">
            Découvrir nos biens
            <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
