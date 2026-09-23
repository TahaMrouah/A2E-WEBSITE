import React, { useState } from "react";

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


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email,
                        password,
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


            /*
             * Login successful.
             *
             * The backend has created the
             * authentication cookie.
             */

            navigate("/admin");

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


    return (

        <main className="admin-login-page">

            {/* LEFT SIDE */}

            <section className="admin-login-visual">

                <div className="admin-login-overlay"></div>

                <div className="admin-login-brand">

                    <span>A2E</span>

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

                        <em>immobilier.</em>

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


                    <div className="admin-login-mobile-brand">

                        <span>A2E</span>

                        <small>
                            IMMOBILIER
                        </small>

                    </div>


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