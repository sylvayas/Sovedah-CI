import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { BilletData } from "@/types";

export const FormulaEmail: React.FC<BilletData> = ({
  clientName = "Non spécifié",
  clientLastname = "Non spécifié",
  clientEmail = "Non spécifié",
  clientPhone = "Non spécifié",
  dateNaissance = "Non spécifié",
  nationality = "Non spécifié",
  sexe = "Non spécifié",
  typePiece = "Non spécifié",
  numeroPiece = "Non spécifié",
  departureDate = "Non spécifié",
  returnDate = "Non spécifié",
  travelOption = "Non spécifié",
  passengerCount = "Non spécifié",
  departureCountry = "Non spécifié",
  arrivalCountry = "Non spécifié",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Demande de réservation - Sovedah CI</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_BASE_URL || "https://sovedah-ci.com"}/images/logo_sovedah_white.jpg`}
            width="100"
            height="100"
            alt="Sovedah CI"
            style={logo}
          />
          <Section style={section}>
            <Text style={text}>Information sur le client</Text>
            <Text style={text}>Nom : {clientName}</Text>
            <Text style={text}>Prénom : {clientLastname}</Text>
            <Text style={text}>Email : {clientEmail}</Text>
            <Text style={text}>Téléphone : {clientPhone}</Text>
            <Text style={text}>Date de naissance : {dateNaissance}</Text>
            <Text style={text}>Nationalité : {nationality}</Text>
            <Text style={text}>Sexe : {sexe}</Text>
            <Text style={text}>Type de pièce : {typePiece}</Text>
            <Text style={text}>Numéro de la pièce : {numeroPiece}</Text>
            <Text style={text}>Option de voyage : {travelOption}</Text>
            <Text style={text}>Nombre de passagers : {passengerCount}</Text>
            <Text style={text}>Pays de départ : {departureCountry}</Text>
            <Text style={text}>Pays d'arrivée : {arrivalCountry}</Text>
            <Text style={text}>Date de départ : {departureDate}</Text>
            {returnDate !== "Non spécifié" && (
              <Text style={text}>Date de retour : {returnDate}</Text>
            )}
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>
              Merci de faire confiance à Sovedah CI. 
              Votre commande est en cours de traitement. Nous vous contacterons prochainement pour finaliser votre réservation.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles inchangés
const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const logo: React.CSSProperties = {
  margin: "0 auto",
  objectFit: "cover",
};

const heading: React.CSSProperties = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center",
};

const section: React.CSSProperties = {
  padding: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid #e6ebf1",
  borderRadius: "6px",
  marginBottom: "20px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  margin: "10px 0",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
  fontStyle: "italic",
};

export default FormulaEmail;