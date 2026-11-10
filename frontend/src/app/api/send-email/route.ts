import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/serverMailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message, ipAddress } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailResults = await sendInquiryEmails({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || undefined,
      service: service?.trim() || undefined,
      message: message.trim(),
      ipAddress,
    });

    return NextResponse.json({
      success: true,
      message: "Emails processed successfully.",
      data: emailResults,
    });
  } catch (error) {
    console.error("API /send-email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to dispatch emails.",
      },
      { status: 500 }
    );
  }
}
