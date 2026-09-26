
import { useEffect, useState } from "react";
import { getProperties } from "../Data/propertyApi";

export default function useProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProperties = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProperties();

            setProperties(
                Array.isArray(data) ? data : []
            );
        } catch (err) {
            console.error(
                "Error loading properties:",
                err
            );

            setError(
                "Impossible de charger les propriétés."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    return {
        properties,
        loading,
        error,
        refreshProperties: loadProperties,
    };
}

