
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    FaLock,
    FaUser,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import "../Style/Admin/login.css";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [checkingAuth, setCheckingAuth] = useState(true);


    // ========================================
    // CHECK IF ALREADY LOGGED IN
    // ========================================

    useEffect(() => {

        const checkAuthentication = async () => {

            try {

                const response = await fetch(
                    "/api/auth/me",
                    {
                        method: "GET",
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (
                    response.ok &&
                    data.authenticated === true
                ) {

                    navigate(
                        "/admin",
                        {
                            replace: true,
                        }
                    );

                    return;
                }

            } catch (error) {

                console.error(
                    "Authentication check error:",
                    error
                );

            } finally {

                setCheckingAuth(false);

            }
        };

        checkAuthentication();

    }, [navigate]);


    // ========================================
    // LOGIN
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message ||
                    "Adresse e-mail ou mot de passe incorrect."
                );

                return;
            }


            if (data.authenticated === true) {

                navigate(
                    "/admin",
                    {
                        replace: true,
                    }
                );

            } else {

                setError(
                    "La connexion a échoué."
                );

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                "Impossible de contacter le serveur."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================
    // CHECKING SESSION
    // ========================================

    if (checkingAuth) {

        return (
            <main className="admin-login-page">

                <div
                    style={{
                        width: "100%",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Vérification de la session...
                </div>

            </main>
        );

    }


    // ========================================
    // PAGE
    // ========================================

    return (

        <main className="admin-login-page">


            {/* LEFT SIDE */}

            <section className="admin-login-visual">

                <div className="admin-login-overlay"></div>


                <div className="admin-login-brand">

                    <span>
                        A2E
                    </span>

                    <small>
                        IMMOBILIER
                    </small>

                </div>


                <div className="admin-login-quote">

                    <span className="admin-login-label">
                        ESPACE ADMINISTRATION
                    </span>


                    <h1>

                        Gérez votre

                        <br />

                        <em>
                            immobilier.
                        </em>

                    </h1>


                    <p>

                        Gérez vos propriétés, vos offres et
                        les informations de votre agence
                        depuis votre espace d'administration.

                    </p>

                </div>

            </section>


            {/* RIGHT SIDE */}

            <section className="admin-login-form-section">

                <div className="admin-login-form-container">


                    {/* MOBILE BRAND */}

                    <div className="admin-login-mobile-brand">

                        <span>
                            A2E
                        </span>

                        <small>
                            IMMOBILIER
                        </small>

                    </div>


                    {/* HEADING */}

                    <div className="admin-login-heading">

                        <span className="admin-section-label">

                            BIENVENUE

                        </span>


                        <h2>
                            Connexion
                        </h2>


                        <p>

                            Connectez-vous à votre espace
                            d'administration.

                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        className="admin-login-form"
                        onSubmit={handleSubmit}
                    >


                        {/* EMAIL */}

                        <div className="admin-input-group">

                            <label htmlFor="admin-email">

                                Adresse e-mail

                            </label>


                            <div className="admin-input-wrapper">

                                <FaUser
                                    className="admin-input-icon"
                                />


                                <input
                                    id="admin-email"
                                    type="email"
                                    placeholder="admin@a2eimmobilier.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="admin-input-group">

                            <label htmlFor="admin-password">

                                Mot de passe

                            </label>


                            <div className="admin-input-wrapper">

                                <FaLock
                                    className="admin-input-icon"
                                />


                                <input
                                    id="admin-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Masquer le mot de passe"
                                            : "Afficher le mot de passe"
                                    }
                                >

                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="admin-login-error">

                                {error}

                            </div>

                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="admin-login-button"
                            disabled={loading}
                        >

                            <span>

                                {loading
                                    ? "Connexion..."
                                    : "Se connecter"}

                            </span>


                            <span className="admin-login-button-arrow">

                                →

                            </span>

                        </button>


                    </form>


                    {/* FOOTER */}

                    <div className="admin-login-footer">

                        <span>
                            A2E IMMOBILIER
                        </span>

                        <span className="admin-login-separator">
                            •
                        </span>

                        <span>
                            Administration
                        </span>

                    </div>


                </div>

            </section>

        </main>

    );
}


export default Login;

