// /api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/sendEmail";
import AccessoiresEmail from "@/emails/accessoires-email";

export async function POST(request: NextRequest) {
  try {
    const { subject, to, emailData } = await request.json();
    console.log("API received:", { subject, to, emailData });

    // Valider les entrées
    if (!subject || !to || !Array.isArray(to) || to.length === 0) {
      return NextResponse.json(
        { error: "Invalid input", details: "Subject and to array are required" },
        { status: 400 }
      );
    }

    if (!emailData || typeof emailData !== "object") {
      return NextResponse.json(
        { error: "Invalid input", details: "emailData is required and must be an object" },
        { status: 400 }
      );
    }

    // Champs requis pour FormulaEmail (exclure category)
    const requiredFields = [
      "clientName",
      "clientEmail",
      "clientPhone",
      "clientAdresse",
      "date",
      "quantity",
      "productTitle",
      
    ];
    for (const field of requiredFields) {
      if (emailData[field] === undefined || emailData[field] === null || emailData[field] === "") {
        return NextResponse.json(
          { error: "Invalid input", details: `Missing or invalid required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Filtrer emailData pour ne conserver que les champs nécessaires
    const filteredEmailData = {
      clientName: emailData.clientName,
      clientEmail: emailData.clientEmail,
      clientPhone: emailData.clientPhone,
      clientAdresse: emailData.clientAdresse,
      date: emailData.date,
      quantity: emailData.quantity,
      productTitle: emailData.productTitle,
      productDescription: emailData.productDescription || "",
    };

    await sendEmail({
      subject,
      to,
      react: AccessoiresEmail(filteredEmailData),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error.message, error.stack);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }



}
