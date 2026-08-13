const lastUpdated = "August 13, 2026";

const sections = [
  {
    title: "1. Introduction",
    body: [
      `Welcome to FixIt Now. These Terms and Conditions ("Terms") govern your access to and use of the FixIt Now website, mobile app, and services (together, the "Platform"), operated by FixIt Now ("we", "us", "our").`,
      "By creating an account, booking a service, or otherwise using the Platform, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.",
    ],
  },
  {
    title: "2. Who We Are",
    body: [
      "FixIt Now is a marketplace that connects customers with independent, third-party technicians and service providers for home services such as AC service and repair, cleaning, plumbing, electrical work, appliance repair, and pest control.",
      "We do not employ technicians directly. Technicians listed on the Platform are independent professionals or businesses who agree to our technician terms and are responsible for the quality of the work they perform.",
    ],
  },
  {
    title: "3. Creating an Account",
    body: [
      "You must provide accurate, current, and complete information when creating an account, and keep this information up to date.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorized use of your account.",
      "You must be at least 18 years old to create an account and book services on the Platform.",
    ],
  },
  {
    title: "4. Booking a Service",
    body: [
      "When you submit a booking request, you are asking us to match you with an available technician for the service you selected. A booking is confirmed once a technician accepts the request.",
      "Prices shown at the time of booking are estimates based on the information you provide. Final pricing may vary if the technician identifies additional work required once on site, and any change will be communicated to you before extra work begins.",
      "You agree to provide accurate details about the service location and the issue you need resolved, and to ensure reasonable access to your property at the scheduled time.",
    ],
  },
  {
    title: "5. Cancellations & Rescheduling",
    body: [
      "You may cancel or reschedule a booking free of charge up to 2 hours before the scheduled appointment time.",
      "Cancellations made less than 2 hours before the appointment, or a technician arriving to find no one available, may incur a cancellation fee to cover the technician's time.",
      "We reserve the right to cancel or reassign a booking if a technician becomes unavailable, and will make reasonable efforts to notify you and offer an alternative as soon as possible.",
    ],
  },
  {
    title: "6. Payments",
    body: [
      "Payment for completed services may be made through the payment methods available on the Platform, including cash on completion and digital payment options where offered.",
      "Any service charges, taxes, or platform fees will be clearly shown before you confirm a booking.",
      "Refunds for services that were not completed satisfactorily are handled on a case-by-case basis in line with our resolution process; contact our support team to open a request.",
    ],
  },
  {
    title: "7. Technician Conduct & Quality",
    body: [
      "Technicians on FixIt Now agree to a code of conduct covering professionalism, safety, and workmanship. We carry out identity and background checks before onboarding technicians to the Platform.",
      "If you are not satisfied with a completed service, you may report the issue through the Platform within 48 hours, and we will work with you and the technician toward a resolution.",
      "FixIt Now is not itself a party to the service agreement between you and the technician, but we facilitate dispute resolution in good faith between both parties.",
    ],
  },
  {
    title: "8. User Responsibilities",
    body: [
      "You agree not to use the Platform for any unlawful purpose, to harass or endanger any technician, or to submit false or misleading information.",
      "You agree to treat technicians with respect and to provide a safe working environment for the duration of the service visit.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "FixIt Now facilitates connections between customers and independent technicians but does not guarantee the outcome of any service performed. To the extent permitted by law, our liability for any claim arising from your use of the Platform is limited to the amount you paid for the relevant booking.",
      "We are not liable for indirect, incidental, or consequential damages arising from services booked through the Platform.",
    ],
  },
  {
    title: "10. Termination",
    body: [
      "We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or misuse the Platform in a way that harms other users or technicians.",
      "You may close your account at any time by contacting our support team.",
    ],
  },
  {
    title: "11. Changes to These Terms",
    body: [
      "We may update these Terms from time to time to reflect changes in our services or legal requirements. We will notify you of material changes through the Platform or by email, and continued use after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "12. Governing Law",
    body: [
      "These Terms are governed by the laws of the People's Republic of Bangladesh. Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts of Dhaka.",
    ],
  },
  {
    title: "13. Contact Us",
    body: [
      "If you have questions about these Terms, reach out to us at support@fixitnow.com or through the Contact page on our Platform.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-375  lg:px-9 md:px-6 px-3  mx-auto mt-10 lg:mt-20  py-12 bg-white">
      <header className="mb-12 pb-8 border-b border-slate-100">
        <span className="inline-block text-sm font-semibold tracking-wide text-[#4640de] uppercase mb-4">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Terms &amp; Conditions
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
