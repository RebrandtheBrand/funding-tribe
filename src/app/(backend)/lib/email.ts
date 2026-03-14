import { Resend } from "resend";

const resend = new Resend("re_BB4xa7g2_GkTB5hay5DQ4XAApKqVmDZaZ");

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  message,
}: ContactEmailParams) {
  try {
    const data = await resend.emails.send({
      from: "Funding Tribe <contact@fundingtribe.uk>",
      to: ["contact@fundingtribe.co.uk"],
      replyTo: email,
      subject: `Funding Tribe Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This email was sent from your website's contact form. 
            You can reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
