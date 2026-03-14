import { NextResponse } from "next/server";

import { createError, handleApiError } from "../../utils/utils";
import { sendContactEmail } from "../../lib/email";
import Contact from "../../models/contactModel";
import dbConnect from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      throw createError({
        type: "MissingFieldError",
        message: "Name, email, and message are required",
        statusCode: 400,
      });
    }

    // Send email notification
    const emailResult = await sendContactEmail({ name, email, message });

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: contact,
      },
      { status: 201 },
    );
  } catch (err) {
    return handleApiError(err);
  }
}
