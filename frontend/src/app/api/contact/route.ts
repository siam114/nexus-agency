import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/serverMailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (name, email, message).",
        },
        { status: 400 }
      );
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://nexusagency-backend.onrender.com/api/v1";

    let backendId = `inq-${Date.now()}`;
    let backendStatus = "new";

    // 1. Forward inquiry to MongoDB Atlas via Render backend
    try {
      const res = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company?.trim() || undefined,
          service: service?.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (res.ok) {
        const resData = await res.json();
        if (resData?.data?.id) backendId = resData.data.id;
        if (resData?.data?.status) backendStatus = resData.data.status;
      }
    } catch (err) {
      console.warn("Backend MongoDB persistence warning (continuing with email dispatch):", err);
    }

    // 2. Dispatch both emails (Admin Notification & Client Confirmation) via Vercel SMTP (Port 465 SSL)
    const emailResults = await sendInquiryEmails({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || undefined,
      service: service?.trim() || undefined,
      message: message.trim(),
      ipAddress,
    });

    console.log("Email dispatch results:", emailResults);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your project inquiry has been received. Our team will contact you within 24 hours.",
        data: {
          id: backendId,
          status: backendStatus,
          emailsSent: emailResults,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          (error as Error).message || "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
