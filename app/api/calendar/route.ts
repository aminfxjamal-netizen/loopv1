export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { action, email, appPassword, details } = await req.json();

    if (!email || !appPassword) {
      return Response.json({ success: false, error: "Calendar not connected." }, { status: 400 });
    }

    // For V1: Generate a calendar invite email via Gmail SMTP
    // The invite is an .ics file attachment sent to the recipient
    
    const { to, subject, date, time, duration } = details;

    // Create .ics calendar file content
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + (parseInt(duration) || 60) * 60000);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Loop//EN
BEGIN:VEVENT
DTSTART:${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${subject}
DESCRIPTION:Meeting scheduled by Loop
ORGANIZER;CN=${email}:mailto:${email}
ATTENDEE:mailto:${to}
END:VEVENT
END:VCALENDAR`;

    // Send email with calendar invite via Gmail SMTP
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: email, pass: appPassword }
    });

    await transporter.sendMail({
      from: email,
      to: to,
      subject: `Meeting: ${subject}`,
      text: `Meeting scheduled for ${date} at ${time}. Duration: ${duration || 60} minutes.\n\nSent by Loop.`,
      attachments: [{
        filename: 'invite.ics',
        content: icsContent,
        contentType: 'text/calendar; charset=UTF-8'
      }]
    });

    return Response.json({
      success: true,
      message: `Meeting scheduled with ${to} for ${date} at ${time}.`
    });

  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}