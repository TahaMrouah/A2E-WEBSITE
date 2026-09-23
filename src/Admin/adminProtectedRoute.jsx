import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        let mounted = true;

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

                if (mounted) {
                    setAuthenticated(
                        response.ok &&
                        data.authenticated === true
                    );
                }

            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );

                if (mounted) {
                    setAuthenticated(false);
                }

            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        checkAuthentication();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Vérification de la session...
            </div>
        );
    }

    if (!authenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
}

export default AdminProtectedRoute;