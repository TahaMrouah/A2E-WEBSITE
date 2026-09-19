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
import { useState } from "react";
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
const cards=[
  {
    id:1,
    title:"🏡✨ À VENDRE – BELLE VILLA À BOUSKOURA DALIA",
    subheader:"September 18, 2026",
    description: "À la recherche d'une villa spacieuse, élégante et pleine de charme ? Découvrez cette belle propriété située dans le quartier recherché de Bouskoura Dalia, pensée pour offrir confort, espace et convivialité à toute la famille.",
    price: "2950000",
    img:img,
    postTime:"September 18, 2026",
  }
]

export default function RecipeReviewCard() {
  //const [expanded, setExpanded] = React.useState(false);

  /*const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };*/

  return (
    <>
      <div style={{ width: "35%", margin: "25px", fontFamily: "" }}>
        <h6 style={{ color: "#c9a24a", fontWeight: "bold" }}>Nos Offres</h6>
        <h1>
          Des Biens d'exception sélectionnés pour vous
        </h1>
      </div>
      <section className="cards">
        {cards.map((card)=>(
          <>
        <Card sx={{ maxWidth: 345 }} className="card">
          <div>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: "gold" }} aria-label="recipe">
                A2E
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={card.title}
            subheader={card.subheader}
          />
          <CardMedia
            component="img"
            height="194"
            image={card.img}
            alt="Paella dish"
          />
          </div>
          <div>
          <CardContent>
            <Typography variant="body2">
              {card.description}
            </Typography>
          </CardContent>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>Prix: {card.price}</Typography>
              <Typography sx={{ marginBottom: 2 }}>
                ✨ Une villa sur plusieurs niveaux composée de :  
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>🛏️ 4 chambres,
                dont une belle suite/chambre de 25 m² </Typography>
              <Typography sx={{ marginBottom: 2 }}>🛋️ Plusieurs espaces salon
                et séjour 🍽️ Cuisine & salle à manger</Typography>
              <Typography sx={{ marginBottom: 2 }}>🛁 Salles de bain & hammam</Typography>
              <Typography sx={{ marginBottom: 2 }}>🔥 Espaces avec cheminées décoratives</Typography>
              <Typography sx={{ marginBottom: 2 }}>🌿 Cour extérieure</Typography>
              <Typography sx={{marginBottom:2}}>🚗
                Garage</Typography>
                <Typography sx={{ marginBottom: 2 }}>☀️ Terrasse + magnifique toit-terrasse</Typography>
            </CardContent>
          
          </div>
        </Card>
        </>
      ))}
       
      </section>
    </>
  );
}
