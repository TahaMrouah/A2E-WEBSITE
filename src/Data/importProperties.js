
import properties from "./properties";
import { addProperty } from "./propertyApi";

const importProperties = async () => {
    try {
        console.log(
            `Starting import of ${properties.length} properties...`
        );

        for (const property of properties) {
            const propertyToSave = {
                title: property.title,
                subheader: property.subheader || "",
                location: property.location || "",
                type: property.type || "Villa",
                status: property.status || "À VENDRE",
                price: Number(property.price) || 0,
                surface: property.surface || "",
                landArea: property.landArea || "",
                bedrooms: Number(property.bedrooms) || 0,
                bathrooms: Number(property.bathrooms) || 0,
                description: property.description || "",
                intro: property.intro || "",
                features: Array.isArray(property.features)
                    ? property.features
                    : [],
                images: Array.isArray(property.images)
                    ? property.images.filter(Boolean)
                    : [],
            };

            console.log(
                `Importing: ${propertyToSave.title}`
            );

            const createdProperty =
                await addProperty(propertyToSave);

            console.log(
                "Successfully imported:",
                createdProperty
            );
        }

        console.log(
            "================================="
        );

        console.log(
            "ALL PROPERTIES IMPORTED SUCCESSFULLY"
        );

        console.log(
            "================================="
        );
    } catch (error) {
        console.error(
            "IMPORT FAILED:",
            error
        );
    }
};

importProperties();
