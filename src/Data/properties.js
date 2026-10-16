const CalifornieAppImages = import.meta.glob(
  "../assets/Appartement Californie/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const maisonhaylaymoun = import.meta.glob(
  "../assets/Maison Hay Laymoun/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const villabouskoura = import.meta.glob(
  "../assets/Villa Bouskoura/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const villabousnika = import.meta.glob(
  "../assets/Villa Bouznika/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const villabernossi = import.meta.glob(
  "../assets/Villa bernoussi/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const properties = [
  {
    id: 1,

    title: "🏡✨ À VENDRE – BELLE VILLA À BOUSKOURA DALIA",

    subheader: "September 18, 2026",

    location: "Bouskoura Dalia, Casablanca",

    type: "Villa",

    status: "À VENDRE",

    price: 2950000,

    surface: "200 m²",

    landArea: "—",

    bedrooms: 4,

    bathrooms: 3,

    description:
      "À la recherche d'une villa spacieuse, élégante et pleine de charme ? Découvrez cette belle propriété située dans le quartier recherché de Bouskoura Dalia, pensée pour offrir confort, espace et convivialité à toute la famille.",

    intro:
      "✨ Appartement à Californie :",

    features: [
      "🛏️ 4 chambres, dont une suite/chambre de 25 m²",
      "🛋️ Plusieurs espaces salon et séjour",
      "🍽️ Cuisine & salle à manger",
      "🛁 Salles de bain & hammam",
      "🔥 Espaces avec cheminées décoratives",
      "🌿 Cour extérieure",
      "🚗 Garage",
      "☀️ Terrasse + magnifique toit-terrasse"
    ],

    images: [
      villabouskoura["../assets/Villa Bouskoura/img1.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img2.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img3.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img4.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img5.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img6.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img7.jpeg"],
      villabouskoura["../assets/Villa Bouskoura/img8.jpeg"],
    ]
  },

  {
    id: 2,

    title: "Appartement moderne à vendre à Californie",

    subheader: "Casablanca",

    location: "Californie, Casablanca",

    type: "Appartement",

    status: "À VENDRE",

    price: 1690000,

    surface: "110 m²",

    landArea: "",

    bedrooms: 3,

    bathrooms: 2,

    description:
      "Un appartement moderne d'exception offrant des espaces généreux, une architecture élégante et un cadre de vie privilégié.",

    intro:
      "✨ Une propriété contemporaine offrant :",

    features: [
      "🛏️ 3 chambres",
      "🛁 2 salles de bain",
      "🚗 Garage",
      "🛋️ Salon spacieux",
      "🍽️ Cuisine"
    ],

    images: [
      CalifornieAppImages["../assets/Appartement Californie/img5.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img4.jpeg"],
      
      CalifornieAppImages["../assets/Appartement Californie/img6.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img7.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img8.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img9.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img10.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img11.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img12.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img13.jpeg"],
      CalifornieAppImages["../assets/Appartement Californie/img14.jpeg"],
    ]
  },

  {
    id: 3,

    title: "Villa Bernoussi Hay al qods",

    subheader: "Casablanca",

    location: "Bernossi, Casablanca",

    type: "Villa",

    status: "À VENDRE",

    price: 2400000,

    surface: "141 m²",

    landArea: "342 m²",

    bedrooms: 5,

    bathrooms: 4,

    description:
      "Une propriété raffinée dans un environnement résidentiel recherché, idéale pour une famille à la recherche de confort et d'intimité.",

    intro:
      "✨ Une propriété raffinée composée de :",

    features: [
      "🛏️ 4 chambres",
      "🛁 4 salles de bain",
      "🌿 Jardin",
      "🛋️ Salon spacieux",
      "🚗 Garage"
    ],

    images: [
      villabernossi["../assets/Villa bernoussi/img1.jpeg"],
      villabernossi["../assets/Villa bernoussi/img2.jpeg"],
      villabernossi["../assets/Villa bernoussi/img3.jpeg"],
      villabernossi["../assets/Villa bernoussi/img4.jpeg"],
      villabernossi["../assets/Villa bernoussi/img5.jpeg"],

    ]
  },

  
{
  id: 4,

  title: "Villa à Bousnika",

  subheader: "Bouznika, Casablanca",

  location: "Bouznika, Casablanca",

  type: "Villa",

  status: "À VENDRE",

  price: 2950000,

  surface: "250 m²",

  landArea: "970 m²",

  bedrooms: 4,

  bathrooms: 2,

  description:
    "Belle villa située dans le quartier recherché de Bouskoura Dalia, offrant de beaux volumes, plusieurs espaces de vie et un cadre idéal pour une vie familiale confortable et conviviale.",

  intro:
    "✨ Une villa sur plusieurs niveaux composée de :",

  features: [
    "🛏️ 4 chambres, dont une chambre de 25 m²",
    "🛋️ Plusieurs salons et espaces de séjour",
    "🍽️ Cuisine et salle à manger",
    "🛁 2 salles de bain et hammam",
    "🔥 Espaces avec cheminées décoratives",
    "🌿 Cour extérieure",
    "🚗 Garage",
    "☀️ Terrasse et magnifique toit-terrasse"
  ],

  images: [
    villabousnika["../assets/Villa Bouznika/img1.jpeg"],
    villabousnika["../assets/Villa Bouznika/img2.jpeg"],
    villabousnika["../assets/Villa Bouznika/img3.jpeg"],
    villabousnika["../assets/Villa Bouznika/img4.jpeg"],
    villabousnika["../assets/Villa Bouznika/img5.jpeg"],
  ]
},


  
];

export default properties;