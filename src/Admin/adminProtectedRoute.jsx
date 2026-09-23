// AdminProtectedRoute.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        fetch(
            "http://localhost:5000/api/auth/me",
            {
                credentials: "include",
            }
        )
            .then(async (response) => {

                if (!response.ok) {
                    throw new Error("Not authenticated");
                }

                const data = await response.json();

                setAuthenticated(
                    data.authenticated === true
                );

            })
            .catch(() => {
                setAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <div>Vérification de la session...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default AdminProtectedRoute;