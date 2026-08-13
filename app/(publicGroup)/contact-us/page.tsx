import {
  MapPin,
  Phone,
  Mail,
  Clock,
  //   Facebook,
  //   Instagram,
  //   Twitter,
  //   Linkedin,
  Wrench,
} from "lucide-react";
import ContactForm from "../_components/Contactform";
import Link from "next/link";

// This would come from your CMS or API in a real application
const contactData = {
  title: "GET IN TOUCH",
  subtitle: "Let's Start a Conversation",
  description:
    "FixIt Now connects you with verified technicians for AC service, home cleaning, plumbing, electrical work, and more across Dhaka. Tell us what you need and we'll match you with the right professional.",
  address: "House 12, Road 4, Mohakhali DOHS, Dhaka 1216, BD",
  phone: "+88 01322 555996",
  email: "support@fixitnow.com",
  hours: "Every day: 8am - 10pm",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6947.317028136903!2d90.36501104141328!3d23.837090178125614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a3366b005%3A0x901b07016468944c!2sMirpur%20DOHS%2C%20Dhaka!5e1!3m2!1sen!2sbd!4v1747755259888!5m2!1sen!2sbd",
  //   socialMedia: [
  //     { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  //     { name: "Facebook", url: "https://facebook.com", icon: Facebook },
  //     { name: "Twitter", url: "https://twitter.com", icon: Twitter },
  //     { name: "Linkedin", url: "https://linkedin.com", icon: Linkedin },
  //   ],
};

const infoItems = [
  { icon: MapPin, title: "Service Area", value: contactData.address },
  { icon: Phone, title: "Phone", value: contactData.phone },
  { icon: Mail, title: "Email", value: contactData.email },
  { icon: Clock, title: "Hours", value: contactData.hours },
];

export default function ContactPage() {
  return (
    <div className="max-w-375  lg:px-9 md:px-6 px-2  mx-auto mt-10 lg:mt-20  py-12 bg-white">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4640de]/10 mb-5">
          <Wrench className="w-5 h-5 text-[#4640de]" strokeWidth={1.75} />
        </div>
        <h1 className=" text-base md:text-lg font-bold mb-4 tracking-tight text-slate-900">
          {contactData.title}
        </h1>
        <p className=" md:text-4xl text-2xl text-slate-500 max-w-2xl mx-auto">
          {contactData.subtitle}
        </p>
      </section>

      {/* Info + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="bg-slate-50 rounded-2xl md:p-5 p-3 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Contact Information
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              {contactData.description}
            </p>

            <div className="space-y-6">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full border border-slate-100 text-slate-700">
                    <item.icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Are you a technician? */}
          <div className="rounded-2xl md:p-5 p-3 border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-1.5">
              Are you a technician?
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Join FixIt Now and start getting service requests in your area.
            </p>
            <Link
              href="/login"
              className="text-sm font-medium text-[#4640de] hover:underline underline-offset-4"
            >
              Add your services →
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 md:p-6 p-3 order-1 lg:order-2">
          <h2 className="text-2xl font-bold mb-1.5 text-slate-900">
            Send Us a Message
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Fill in the details below and we will get back to you shortly.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="mt-16">
        <h2 className="text-3xl my-8 font-bold text-center text-slate-900">
          Where we operate
        </h2>
        <div className="h-[400px] rounded-xl overflow-hidden border border-slate-100">
          <iframe
            src={contactData.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="FixIt Now Service Area"
          />
        </div>
      </section>
    </div>
  );
}
