
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
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Valider les adresses email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const toArray = Array.isArray(to) ? to : [to];
    for (const email of toArray) {
      if (!emailRegex.test(email)) {
        throw new Error(`Invalid email address: ${email}`);
      }
    }

    console.log("Sending email to:", to, "with subject:", subject);
    console.log("From address:", "Sovedah CI <no-reply@sovedah-ci.com>");

    const data = await resend.emails.send({
      from: "Sovedah CI <no-reply@sovedah-ci.com>", // Remplace par ton domaine vérifié
      to: ["sylvayas@gmail.com"],
      subject : "Test",
      react,
    });

    console.log("Email sent successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Error sending email:", error.message, error.stack);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
