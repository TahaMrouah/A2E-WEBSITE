
const propertyImages = import.meta.glob(
    "../assets/**/*.{png,jpg,jpeg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
);

export function resolvePropertyImage(image) {
    if (!image) {
        return "";
    }

    // Supports images already coming from URLs
    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:") ||
        image.startsWith("/")
    ) {
        return image;
    }

    const imagePath = `../assets/${image}`;

    return propertyImages[imagePath] || "";
}

