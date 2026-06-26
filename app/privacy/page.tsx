export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: June 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-gray-600">
              Loop is designed with privacy in mind. We collect the minimum information necessary to provide the Service:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              <li><strong>Gmail account:</strong> Used solely to send emails and draft replies on your behalf. We do not read, store, or analyze your inbox contents beyond what is necessary for your current session.</li>
              <li><strong>Messages you type:</strong> Sent to our AI provider (Groq) to generate responses. These are processed in real-time and not permanently stored by us.</li>
              <li><strong>Usage data:</strong> Basic, anonymized data such as number of emails sent per day, solely for enforcing rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              We use your information exclusively to provide and improve the Service. Specifically:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              <li>To send emails you instruct Loop to send</li>
              <li>To generate AI-powered drafts and replies</li>
              <li>To enforce daily sending limits</li>
              <li>To debug and improve the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Data Storage</h2>
            <p className="text-gray-600">
              Loop does not permanently store your emails, inbox contents, or message history on our servers. Conversations are ephemeral unless you explicitly choose to save them. We may introduce optional conversation history in the future, which will be disclosed clearly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Data Sharing</h2>
            <p className="text-gray-600">
              We do not sell, rent, or share your personal data with third parties. The only third parties involved in processing are:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              <li><strong>Groq:</strong> AI processing. Your messages are sent to Groq&apos;s API to generate responses.</li>
              <li><strong>Vercel:</strong> Hosting infrastructure. Your requests pass through Vercel&apos;s servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Security</h2>
            <p className="text-gray-600">
              We take reasonable measures to protect your information. Gmail credentials (App Passwords) are not stored in plaintext and are only used for the duration of your session. We recommend using Google&apos;s App Password feature rather than your primary password.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Your Rights</h2>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              <li>Request deletion of any data associated with your account</li>
              <li>Revoke Loop&apos;s access to your Gmail at any time via your Google Account settings</li>
              <li>Stop using the Service at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Cookies and Tracking</h2>
            <p className="text-gray-600">
              Loop does not use tracking cookies, analytics, or advertising. Vercel may set essential cookies for deployment and security purposes. We do not track you across the web.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">8. Children&apos;s Privacy</h2>
            <p className="text-gray-600">
              Loop is not directed at children under 13. We do not knowingly collect information from children under 13. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">9. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify users of material changes by updating the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">10. Contact</h2>
            <p className="text-gray-600">
              Questions about this Privacy Policy? Contact us at <a href="mailto:support@loopv1.vercel.app" className="text-blue-600 hover:underline">support@loopv1.vercel.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}