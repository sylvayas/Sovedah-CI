
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
import {  VoiturelocationEmailData } from "@/types";

export const FormulaEmail: React.FC<VoiturelocationEmailData> = ({
  clientName = "Non spécifié",
  clientLastname = "Non spécifié",
  clientEmail = "Non spécifié",
  clientPhone = "Non spécifié",
  drivingLicense = "Non spécifié",
  address = "Non spécifié",
  vehicleModel = "Non spécifié",
  vehicleCategory= "Non spécifié",
 reservationDate = "",
}) => {
  // Validation pour productTitle


  return (
    <Html>
      <Head />
      <Preview>Demande de réservation - Sovedah CI</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_BASE_URL || "https://sovedahci.com"}/images/logo_sovedah_white.jpg`}
            width="100"
            height="100"
            alt="Sovedah CI"
            style={logo}
          />
          <Heading style={heading}>Demande de reservation</Heading>
          <Section style={section}>
            <Text style={text}>Informations du client </Text>
            <Text style={text}>Nom : {clientName}</Text>
            <Text style={text}>Prenom : {clientLastname}</Text>
            <Text style={text}>Email : {clientEmail}</Text>
            <Text style={text}>Téléphone : {clientPhone}</Text>
            <Text style={text}>Numéro du permis de conduire : {drivingLicense}</Text>
            <Text style={text}>Adresse : {address}</Text>
            <Text style={text}>Modèle du véhicule : {vehicleModel}</Text>
            <Text style={text}>Catégorie de véhicule : {vehicleCategory}</Text>
            <Text style={text}>Date de la réservation : {reservationDate}</Text>
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>
              Merci de faire confiance à Sovedah CI. 
              Nous vous contacterons prochainement pour finaliser votre réservation.
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
