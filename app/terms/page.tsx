export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: June 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using Loop (&ldquo;the Service&rdquo;), you agree to these Terms of Service. If you do not agree, do not use the Service. Loop is operated by Loop Technologies (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Beta Status</h2>
            <p className="text-gray-600">
              Loop is currently in beta. The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. Features may change, be removed, or be unavailable at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. User Responsibilities</h2>
            <p className="text-gray-600">
              You are solely responsible for the content of emails sent through Loop. You agree not to use the Service for spam, phishing, harassment, fraud, or any illegal activity. You must comply with all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Email Sending Limits</h2>
            <p className="text-gray-600">
              The free tier of Loop is limited to 10 emails per day. We reserve the right to adjust limits, suspend accounts that exceed reasonable usage, or introduce paid tiers with higher limits.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Third-Party Services</h2>
            <p className="text-gray-600">
              Loop integrates with third-party services including Gmail and AI providers. We are not responsible for the availability, accuracy, or practices of these third-party services. Your use of third-party services is subject to their respective terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, Loop Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to missed emails, lost opportunities, or business interruptions resulting from the use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Account Termination</h2>
            <p className="text-gray-600">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, and without prior notice. You may stop using the Service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">8. Changes to Terms</h2>
            <p className="text-gray-600">
              We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will make reasonable efforts to notify users of significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">9. Contact</h2>
            <p className="text-gray-600">
              Questions about these Terms? Contact us at <a href="mailto:support@loopv1.vercel.app" className="text-blue-600 hover:underline">support@loopv1.vercel.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
