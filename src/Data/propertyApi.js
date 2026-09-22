
const API_URL = "http://localhost:5000/api/properties";

// ========================================
// GET ALL PROPERTIES
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
// ========================================

export async function addProperty(property) {
    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

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
// ========================================

export async function updateProperty(id, property) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

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
// ========================================

export async function deleteProperty(id) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
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

