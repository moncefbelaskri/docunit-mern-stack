import React from "react";
import { Grid, Typography } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import BoltIcon from '@mui/icons-material/Bolt';
import GppGoodIcon from '@mui/icons-material/GppGood';

const iconSize = 30;

const features = [
  {
    color: "#6200EA",
    headline: "Simplicité",
    text: "Interfaçage clair et intuitif pour faciliter l'interaction avec l'utilisateur.",
    icon: <EmojiEmotionsIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#00C853",
    headline: "Connectivité",
    text: "Fini l'obligation de déplacement à l'université, vous pouvez vous inscrire pour vous connectez quand vous voulez et où vous voulez.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
 
  {
    color: "#0091EA",
    headline: "Sécurité",
    text: "Stockage des informations personnels dans une base de donnée dématérialisée, 100% fiable.",
    icon: <GppGoodIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#304FFE",
    headline: "Rapidité",
    text: "Fournir une interface qui se charge rapidement et qui délivre les contenus demandés en quelques secondes.",
    icon: <BoltIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
  {
    color: "#C51162",
    headline: "Facilité",
    text: "Permettre aux doctorants de recevoir leurs  attestation et aux encadrants de gérer à travers une interface l'ensemble des doctorants  pour mieux voir leurs état d'avancement.",
    icon: <ManageAccountsIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#DD2C00",
    headline: "24/7 Support",
    text: "Pour tout problème, l'application contient un FAQ pour répondre aux questions les plus récurrentes et une messagerie pour contacter le support en cas de découverte d'un nouveau problème.",
    icon: <ContactSupportIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200",
  },
];

function Featuresection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

Featuresection.propTypes = {};

export default withTheme(Featuresection);
