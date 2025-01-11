// types/email.ts
export interface FormulaEmailData {
  formulaName: string;
  formulaImage: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  reservationPrice: number;
  period: string;
  date: string;
}

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

export const FormulaEmail: React.FC<FormulaEmailData> = ({
  formulaName,
  formulaImage,
  clientName,
  clientEmail,
  clientPhone,
  reservationPrice,
  period,
  date,
}) => (
  <Html>
    <Head />
    <Preview>Confirmation de réservation - Formule {formulaName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
          width="100"
          height="100"
          alt="Novis Coworking"
          style={logo}
        />
        <Heading style={heading}>Confirmation de réservation</Heading>
        <Section style={section}>
          <Img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${formulaImage}`}
            width="600"
            height="300"
            alt={`Formule ${formulaName}`}
            style={coworkingImg}
          />
          <Text style={text}>Formule réservée : {formulaName}</Text>
          <Text style={text}>Informations du client :</Text>
          <Text style={text}>Nom : {clientName}</Text>
          <Text style={text}>Email : {clientEmail}</Text>
          <Text style={text}>Téléphone : {clientPhone}</Text>
          <Text style={text}>Prix de la formule : {reservationPrice.toLocaleString()} FCFA</Text>
          <Text style={text}>Période : {period}</Text>
          <Text style={text}>Date de début : {date}</Text>
        </Section>
        <Section style={footerSection}>
          <Text style={footerText}>
            Merci de faire confiance à Novis Coworking. 
            Nous vous contacterons prochainement pour finaliser votre réservation.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

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

const coworkingImg: React.CSSProperties = {
  width: "100%",
  height: "auto",
  marginBottom: "16px",
  objectFit: "cover",
  borderRadius: "6px",
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