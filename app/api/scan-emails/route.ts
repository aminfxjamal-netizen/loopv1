export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, appPassword, months } = await req.json();

    if (!email || !appPassword) {
      return new Response(JSON.stringify({ success: false, error: "Email not connected." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const Imap = require('imap');
    const { simpleParser } = require('mailparser');

    const imap = new Imap({
      user: email,
      password: appPassword,
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    });

    const results: any[] = [];
    const billingKeywords = ['invoice', 'receipt', 'subscription', 'billing', 'payment', 'renewal', 'trial ending', 'your monthly', 'paid', 'charged'];

    const searchSince = new Date();
    searchSince.setMonth(searchSince.getMonth() - (parseInt(months) || 3));

    const scanResult = await new Promise<any>((resolve, reject) => {
      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search([['SINCE', searchSince.toISOString()]], (err: any, searchResults: any) => {
            if (err || !searchResults || searchResults.length === 0) {
              imap.end();
              resolve({ success: true, subscriptions: [], message: "No billing emails found." });
              return;
            }

            const latest = searchResults.slice(-200);
            const fetch = imap.fetch(latest, { bodies: '' });

            fetch.on('message', (msg: any) => {
              msg.on('body', (stream: any) => {
                simpleParser(stream, (parseErr: any, parsed: any) => {
                  if (parseErr) return;
                  const subject = (parsed.subject || '').toLowerCase();
                  const textBody = (parsed.text || '').toLowerCase();
                  const combined = subject + ' ' + textBody;

                  if (billingKeywords.some(kw => combined.includes(kw))) {
                    const amountMatch = combined.match(/\$\s*(\d+(\.\d{2})?)/) || combined.match(/(\d+(\.\d{2})?)\s*usd/i);
                    const amount = amountMatch ? '$' + amountMatch[1] : 'Unknown';
                    results.push({
                      from: parsed.from?.text || 'Unknown',
                      subject: parsed.subject || 'No subject',
                      date: parsed.date || new Date().toISOString(),
                      amount: amount
                    });
                  }
                });
              });
            });

            fetch.once('end', () => {
              imap.end();
              resolve({ success: true, subscriptions: results, count: results.length, message: `Found ${results.length} billing emails.` });
            });
          });
        });
      });

      imap.once('error', (err: any) => {
        reject(err);
      });

      imap.connect();
    });

    return new Response(JSON.stringify(scanResult), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}