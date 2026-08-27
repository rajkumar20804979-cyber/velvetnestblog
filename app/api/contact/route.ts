import { NextResponse } from "next/server"
import { Resend } from "resend"


function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.")
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      )
    }
const resend = new Resend(process.env.RESEND_API_KEY)
    const formData = await request.formData()

    const firstName = String(formData.get("firstName") || "").trim()
    const lastName = String(formData.get("lastName") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const subject = String(formData.get("subject") || "").trim()
    const message = String(formData.get("message") || "").trim()

    // Honeypot field for basic spam protection.
    const website = String(formData.get("website") || "").trim()

    if (website) {
      return NextResponse.json({ success: true })
    }

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      )
    }

    // Prevent excessively large submissions.
    if (
      firstName.length > 100 ||
      lastName.length > 100 ||
      email.length > 254 ||
      subject.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      )
    }

    // Basic email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    const subjectLabels: Record<string, string> = {
      general: "General Inquiry",
      collaboration: "Brand Collaboration",
      press: "Press & Media",
      feedback: "Feedback",
      other: "Other",
    }

    const subjectLabel =
      subjectLabels[subject] || "Contact Form Message"

    const safeFirstName = escapeHtml(firstName)
    const safeLastName = escapeHtml(lastName)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

    const { error } = await resend.emails.send({
      from: "VelvetNest <hello@thevelvetnest.site>",
      to: ["hello@thevelvetnest.site"],
      replyTo: email,
      subject: `[${subjectLabel}] Message from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#faf8f5;font-family:Arial,sans-serif;color:#302a26;">
            <div style="max-width:650px;margin:40px auto;padding:32px;background:#ffffff;border:1px solid #e8e1dc;border-radius:16px;">

              <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:30px;">
                New VelvetNest Contact Message
              </h1>

              <p style="margin:0 0 30px;color:#766b64;">
                Someone submitted the contact form on the VelvetNest website.
              </p>

              <div style="margin-bottom:24px;">
                <strong>Name</strong>
                <p style="margin:6px 0 0;">
                  ${safeFirstName} ${safeLastName}
                </p>
              </div>

              <div style="margin-bottom:24px;">
                <strong>Email</strong>
                <p style="margin:6px 0 0;">
                  ${safeEmail}
                </p>
              </div>

              <div style="margin-bottom:24px;">
                <strong>Subject</strong>
                <p style="margin:6px 0 0;">
                  ${escapeHtml(subjectLabel)}
                </p>
              </div>

              <div>
                <strong>Message</strong>
                <div style="margin-top:10px;padding:18px;background:#faf8f5;border-radius:10px;line-height:1.7;">
                  ${safeMessage}
                </div>
              </div>

              <hr style="margin:32px 0;border:none;border-top:1px solid #e8e1dc;" />

              <p style="margin:0;font-size:13px;color:#8a817b;">
                Sent from the contact form at thevelvetnest.site
              </p>

            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)

      return NextResponse.json(
        {
          error:
            "We couldn't send your message right now. Please try again later.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email hello@thevelvetnest.site directly.",
      },
      { status: 500 }
    )
  }
        }
