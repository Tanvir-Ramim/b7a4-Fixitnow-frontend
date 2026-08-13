const lastUpdated = "August 13, 2026";

const sections = [
  {
    title: "1. Introduction",
    body: [
      `This Privacy Policy explains how FixIt Now ("we", "us", "our") collects, uses, and protects your information when you use our website, mobile app, and services (together, the "Platform").`,
      "By using the Platform, you agree to the collection and use of information in line with this policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account information: your name, phone number, email address, and password when you register.",
      "Booking information: service address, service type, appointment details, and any notes you provide about the issue.",
      "Payment information: billing details needed to process payments, handled through our secure payment partners. We do not store full card details on our servers.",
      "Device and usage information: IP address, browser type, app version, and how you interact with the Platform, collected automatically to help us improve the service.",
      "Location information: with your permission, your device location, to match you with nearby technicians and improve service accuracy.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "To create and manage your account, and to process and fulfil your service bookings.",
      "To match you with available technicians and share the necessary booking details with them.",
      "To process payments and send booking confirmations, receipts, and service updates.",
      "To respond to support requests and resolve disputes between customers and technicians.",
      "To improve the Platform, understand usage patterns, and develop new features.",
      "To send you service-related notifications and, where you have opted in, promotional offers. You can opt out of marketing messages at any time.",
    ],
  },
  {
    title: "4. How We Share Your Information",
    body: [
      "With technicians: we share the details necessary for a technician to complete your booking, such as your name, contact number, and service address.",
      "With service providers: we work with payment processors, cloud hosting, and analytics providers who help us operate the Platform, under agreements that require them to protect your data.",
      "For legal reasons: we may disclose information if required by law, regulation, or a valid legal process, or to protect the rights, property, or safety of FixIt Now, our users, or the public.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "5. Cookies & Tracking",
    body: [
      "We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the Platform is used. You can control cookies through your browser settings, though disabling them may affect some features of the Platform.",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      "We use industry-standard technical and organizational measures, including encryption in transit, to protect your information from unauthorized access, loss, or misuse. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      "We retain your information for as long as your account is active or as needed to provide the Platform, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data, subject to any legal retention requirements.",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "You may access, update, or correct your account information at any time through the Platform.",
      "You may request a copy of the personal data we hold about you, or request that we delete it, by contacting us at privacy@fixitnow.com.",
      "You may opt out of marketing communications at any time using the unsubscribe link or by contacting support.",
    ],
  },
  {
    title: "9. Children's Privacy",
    body: [
      "The Platform is not intended for use by anyone under the age of 18, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes through the Platform or by email. Continued use of the Platform after changes take effect constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "11. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how your data is handled, contact us at privacy@fixitnow.com or through the Contact page on our Platform.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-375  lg:px-9 md:px-6 px-2  mx-auto mt-10 lg:mt-20  py-12 bg-white">
      <header className="mb-12 pb-8 border-b border-slate-100">
        <span className="inline-block text-sm font-semibold tracking-wide text-[#4640de] uppercase mb-4">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-slate-500">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="text-slate-500 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
