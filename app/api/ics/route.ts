// @ts-nocheck
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { title, date, time } = await req.json();

    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60000);

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
      `SUMMARY:${title}`,
      'DESCRIPTION:Event created by Loop',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return new Response(icsContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=UTF-8',
        'Content-Disposition': `attachment; filename="loop-event.ics"`
      }
    });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}