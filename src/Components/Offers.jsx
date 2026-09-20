import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import img from "../assets/bg.webp";
import img1 from "../assets/bg1.webp";
import img2 from "../assets/bg2.webp";
import img3 from "../assets/bg3.webp";
import "../Style/cards.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import properties from "../Data/properties";
/*import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from 'components/ExampleCarouselImage';*/

/*const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));*/

export default function RecipeReviewCard() {
  return (
  <>
    <div className="offers-title">
      <h6>Nos Offres</h6>
      <h1>Des Biens d'exception sélectionnés pour vous</h1>
    </div>

    <section className="cards" id="offres">
      {properties.map((card) => (
        <Card key={card.id} className="card">

          {/* LEFT — LARGE IMAGE CAROUSEL */}
          <div className="card-image">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              speed={900}
              className="villa-carousel"
            >
              {card.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${card.title} ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Image counter / label */}
            <div className="property-badge">
              À VENDRE
            </div>
          </div>

          {/* RIGHT — PROPERTY INFORMATION */}
          <div className="card-content">

            <CardHeader
              avatar={
                <Avatar className="a2e-avatar" aria-label="A2E">
                  A2E
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" className="property-menu">
                  <MoreVertIcon />
                </IconButton>
              }
              title={card.title}
              subheader={card.subheader}
            />

            <CardContent className="description">
              <Typography variant="body2">
                {card.description}
              </Typography>
            </CardContent>

            <CardContent className="property-details">

              <Typography className="property-price">
                {Number(card.price).toLocaleString("fr-FR")} MAD
              </Typography>

              <Typography className="property-intro">
                ✨ Une villa sur plusieurs niveaux composée de :
              </Typography>

              <div className="property-features">
                <Typography>🛏️ 4 chambres, dont une suite/chambre de 25 m²</Typography>

                <Typography>
                  🛋️ Plusieurs espaces salon et séjour
                </Typography>

                <Typography>
                  🍽️ Cuisine & salle à manger
                </Typography>

                <Typography>
                  🛁 Salles de bain & hammam
                </Typography>

                <Typography>
                  🔥 Espaces avec cheminées décoratives
                </Typography>

                <Typography>
                  🌿 Cour extérieure
                </Typography>

                <Typography>
                  🚗 Garage
                </Typography>

                <Typography>
                  ☀️ Terrasse + magnifique toit-terrasse
                </Typography>
              </div>

            </CardContent>

            <div className="card-footer">
              <button className="property-button">
                Découvrir le bien
              </button>
            </div>

          </div>

        </Card>
      ))}
      <Link to="/properties" className="offers-more-button">
  Plus d'offres
  <span>→</span>
</Link>
    </section>
  </>
);
}
