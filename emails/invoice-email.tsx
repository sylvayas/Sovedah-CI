// emails/InvoiceEmail.jsx
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

// types/email.ts
export interface EmailData {
  coworkingName: string;
  category: string;
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  reservationPrice: number;
  date: string;
  priceType: string;
  coworkingImage: string;
}

export const InvoiceEmail: React.FC<EmailData> = ({
  coworkingName,
  category,
  location,
  clientName,
  clientEmail,
  clientPhone,
  reservationPrice,
  date,
  priceType,
  coworkingImage,
}) => (
  <Html>
    <Head />
    <Preview>Facture pour votre réservation chez Novis Coworking</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
          width="100"
          height="100"
          alt="Novis Coworking"
          style={logo}
        />
        <Heading style={heading}>Facture de réservation</Heading>
        <Section style={section}>
          <Img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${coworkingImage}`}
            width="600"
            height="300"
            alt={coworkingName}
            style={coworkingImg}
          />
          <Text style={text}>Nom du coworking : {coworkingName}</Text>
          <Text style={text}>Catégorie : {category}</Text>
          <Text style={text}>Lieu : {location}</Text>
          <Text style={text}>Client : {clientName}</Text>
          <Text style={text}>Email : {clientEmail}</Text>
          <Text style={text}>Téléphone : {clientPhone}</Text>
          {reservationPrice && (
            <Text style={text}>Prix : {reservationPrice} FCFA</Text>
          )}
          <Text style={text}>Date : {date}</Text>
          {priceType && <Text style={text}>Type de tarif : {priceType}</Text>}
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
};

const section: React.CSSProperties = {
  padding: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid #e6ebf1",
  borderRadius: "6px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const coworkingImg: React.CSSProperties = {
  width: "100%",
  height: "auto",
  marginBottom: "16px",
  objectFit: "cover",
};

export default InvoiceEmail;
