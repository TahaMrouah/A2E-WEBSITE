
import properties from "./properties";

const STORAGE_KEY = "a2e_properties";

/*
    Get all properties.

    First time:
    → Uses properties.js
    → Copies them into localStorage

    After that:
    → Uses the properties saved by the CRUD system
*/
export function getProperties() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(properties)
        );

        return properties;
    } catch (error) {
        console.error("Error loading properties:", error);

        return properties;
    }
}


/*
    Save the complete property list.
*/
export function saveProperties(properties) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(properties)
        );

        return true;
    } catch (error) {
        console.error("Error saving properties:", error);

        return false;
    }
}


/*
    Add a new property.
*/
export function addProperty(property) {
    const currentProperties = getProperties();

    const numericIds = currentProperties
        .map((item) => Number(item.id))
        .filter((id) => !Number.isNaN(id));

    const nextId =
        numericIds.length > 0
            ? Math.max(...numericIds) + 1
            : 1;

    const newProperty = {
        ...property,
        id: nextId,
    };

    const updatedProperties = [
        ...currentProperties,
        newProperty,
    ];

    saveProperties(updatedProperties);

    return newProperty;
}


/*
    Update an existing property.
*/
export function updateProperty(id, updatedProperty) {
    const currentProperties = getProperties();

    const updatedProperties = currentProperties.map(
        (property) => {
            if (String(property.id) === String(id)) {
                return {
                    ...updatedProperty,
                    id: property.id,
                };
            }

            return property;
        }
    );

    saveProperties(updatedProperties);

    return updatedProperties.find(
        (property) =>
            String(property.id) === String(id)
    );
}


/*
    Delete a property.
*/
export function deleteProperty(id) {
    const currentProperties = getProperties();

    const updatedProperties = currentProperties.filter(
        (property) =>
            String(property.id) !== String(id)
    );

    saveProperties(updatedProperties);

    return updatedProperties;
}


/*
    Optional helper:
    completely reset CRUD data back to properties.js.
*/
export function resetProperties() {
    try {
        localStorage.removeItem(STORAGE_KEY);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialProperties)
        );

        return initialProperties;
    } catch (error) {
        console.error("Error resetting properties:", error);

        return initialProperties;
    }
}

