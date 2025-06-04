"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  subject,
  to,
  react,
  userName,
}: {
  subject: string;
  to: string | string[];
  react: JSX.Element | React.ReactNode;
  userName: string;
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Valider les adresses e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const toArray = Array.isArray(to) ? to : [to];
    for (const email of toArray) {
      if (!emailRegex.test(email)) {
        throw new Error(`Invalid email address: ${email}`);
      }
    }

    // Valider userName
    if (!userName || typeof userName !== "string" || userName.trim() === "") {
      throw new Error("Invalid userName: must be a non-empty string");
    }

    // Valider react
    if (!react) {
      throw new Error("React component is required");
    }

    console.log("Sending email to:", toArray, "with subject:", subject);
    console.log("From address:", `${userName} <no-reply@sovedah-ci.com>`);

    const data = await resend.emails.send({
      from: `${userName} <no-reply@sovedah-ci.com>`,
      to,
      subject,
      react,
    });

    console.log("Email sent successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Error sending email:", error.message, error.stack);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}