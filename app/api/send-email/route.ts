import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/sendEmail";
import InvoiceEmail from "@/emails/invoice-email";
import FormulaEmail from "@/emails/formula-email";

export async function POST(request: NextRequest) {
  const { subject, to, emailData,type } = await request.json();

  try {
    await sendEmail({
      subject,
      to,
      react: type=="coworking"? InvoiceEmail(emailData):FormulaEmail(emailData),
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
