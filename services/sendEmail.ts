"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  subject,
  to,
  react,
}: {
  subject: string;
  to: string | string[];
  react: JSX.Element | React.ReactNode;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "INFOS@sovedahci.com",
      to: to,
      subject: subject,
      react: react,
    });

    if (error) {
      // Vérifiez si 'error' a une propriété 'message'
      throw new Error(error.message || "Erreur lors de l'envoi de l'email");
    }

    console.log("Email envoyé avec succès:", data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
    throw error; // Relancer l'erreur pour qu'elle soit capturée par l'appelant
  }
}