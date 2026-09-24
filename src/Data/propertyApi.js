const API_URL = "https://a2e-api.netlify.app/api/properties";

// ========================================
// GET ALL PROPERTIES
// PUBLIC
// ========================================

export async function getProperties() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load properties");
    }

    return await response.json();
}

// ========================================
// GET ONE PROPERTY
// PUBLIC
// ========================================

export async function getProperty(id) {
    const response = await fetch(
        `${API_URL}/${id}`
    );

    if (!response.ok) {
        throw new Error("Property not found");
    }

    return await response.json();
}

// ========================================
// CREATE PROPERTY
// ADMIN ONLY
// ========================================

export async function addProperty(property) {
    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(property),
    });

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message || "Failed to create property"
        );
    }

    return await response.json();
}

// ========================================
// UPDATE PROPERTY
// ADMIN ONLY
// ========================================

export async function updateProperty(id, property) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(property),
        }
    );

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message || "Failed to update property"
        );
    }

    return await response.json();
}

// ========================================
// DELETE PROPERTY
// ADMIN ONLY
// ========================================

export async function deleteProperty(id) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",

            credentials: "include",
        }
    );

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message || "Failed to delete property"
        );
    }

    return await response.json();
}