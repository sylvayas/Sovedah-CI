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

// types/contactEmail.ts
export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail: React.FC<ContactEmailData> = ({
  name,
  email,
  subject,
  message,
}) => (
  <Html>
    <Head />
    <Preview>Nouveau message de contact de {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
          width="100"
          height="100"
          alt="Novis Coworking"
          style={logo}
        />
        <Heading style={heading}>Nouveau message de contact</Heading>
        <Section style={section}>
          <Text style={text}>
            <strong>Nom :</strong> {name}
          </Text>
          <Text style={text}>
            <strong>Email :</strong> {email}
          </Text>
          <Text style={text}>
            <strong>Sujet :</strong> {subject}
          </Text>
          <Text style={textBold}>Message :</Text>
          <Text style={messageStyle}>{message}</Text>
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
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const textBold: React.CSSProperties = {
  ...text,
  fontWeight: "bold",
};

const messageStyle: React.CSSProperties = {
  ...text,
  backgroundColor: "#f9f9f9",
  padding: "12px",
  borderRadius: "4px",
  whiteSpace: "pre-wrap",
};

export default ContactEmail;
