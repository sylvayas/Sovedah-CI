// /api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/sendEmail";
import BilletreservationEmail from "@/emails/billetreservation-email";

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
      "clientLastname",
      "clientEmail",
      "clientPhone",
      "dateNaissance",
      "nationality",
      "sexe",
      "typePiece",
      "numeroPiece",
      "departureDate",
      "returnDate",
      "travelOption",
      "passengerCount",
      "departureCountry",
      "arrivalCountry",
      
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
      clientLastname: emailData.clientLastname,
      clientEmail: emailData.clientEmail,
      clientPhone: emailData.clientPhone,
      dateNaissance: emailData.dateNaissance,
      nationality:emailData.nationality,
      sexe:emailData.sexe,
      typePiece:emailData.typePiece,
      numeroPiece:emailData.numeroPiece,
      departureDate: emailData.departureDate,
      returnDate:emailData.returnDate,
      travelOption: emailData.travelOption, // Valeur par défaut pour Accessoires de voyage
      passengerCount: emailData.passengerCount,
      departureCountry: emailData.departureCountry,
      arrivalCountry:emailData.arrivalCountry,
    };

    await sendEmail({
      subject,
      to,
      react: BilletreservationEmail(filteredEmailData),
      userName:emailData.clientName,
      userEmail:emailData.clientEmail,
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
