import { NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = LeadFormSchema.safeParse(body.data);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Dữ liệu không hợp lệ", 
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { campaignName } = body;
    const leadData = validationResult.data;

    // Send to Webhook if configured
    const webhookUrl = process.env.FORM_SUBMIT_WEBHOOK_URL;
    const secret = process.env.FORM_SUBMIT_SECRET;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { "Authorization": `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({
          campaignName,
          lead: leadData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Failed to forward lead to webhook:", await response.text());
        // We still return success to the client but log the error
      }
    } else {
      console.warn("FORM_SUBMIT_WEBHOOK_URL is not configured.");
    }

    return NextResponse.json({
      success: true,
      message: "Đăng ký nhận nước thành công! Cảm ơn bạn.",
    });

  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json(
      { success: false, message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
