// @ts-nocheck
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { to, subject, date, time, duration, email, appPassword } = await req.json();

    if (!email || !appPassword) {
      return Response.json({ success: false, error: "Calendar not connected." }, { status: 400 });
    }

    if (!to || !subject || !date || !time) {
      return Response.json({ success: false, error: "Missing meeting details." }, { status: 400 });
    }

    const startTime = new Date(`${date}T${time}:00`);
    const meetingDuration = parseInt(duration) || 60;
    const endTime = new Date(startTime.getTime() + meetingDuration * 60000);

    const formatDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Loop//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${subject}`,
      'DESCRIPTION:Meeting scheduled by Loop',
      `ORGANIZER;CN=${email}:mailto:${email}`,
      `ATTENDEE:mailto:${to}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: email, pass: appPassword }
    });

    // Send to recipient
    await transporter.sendMail({
      from: email,
      to: to,
      subject: subject,
      text: `Meeting: ${subject}\nDate: ${date}\nTime: ${time}\nDuration: ${meetingDuration} minutes\n\nSent by Loop.`,
      attachments: [{
        filename: 'invite.ics',
        content: icsContent,
        contentType: 'text/calendar; charset=UTF-8'
      }]
    });

    // Send to yourself so it adds to your calendar
    await transporter.sendMail({
      from: email,
      to: email,
      subject: `[Your Calendar] ${subject}`,
      text: `Meeting added to your calendar: ${subject} with ${to} on ${date} at ${time}.\n\nOpen the attachment to add it to your calendar.`,
      attachments: [{
        filename: 'invite.ics',
        content: icsContent,
        contentType: 'text/calendar; charset=UTF-8'
      }]
    });

    return Response.json({
      success: true,
      message: `Meeting scheduled: ${subject} with ${to} on ${date} at ${time}. Check your email to add it to your calendar.`
    });

  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}