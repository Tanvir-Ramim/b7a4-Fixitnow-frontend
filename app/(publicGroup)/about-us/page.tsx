import {
  Target,
  Eye,
  ShieldCheck,
  Zap,
  Handshake,
  Users,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Verified technicians" },
  { value: "20K+", label: "Services completed" },
  { value: "15", label: "Areas covered in Dhaka" },
  { value: "4.8/5", label: "Average customer rating" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Every technician on FixIt Now is background-checked and verified before they ever reach your door.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Book in minutes, get matched instantly, and have a professional at your home the same day.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    description:
      "Upfront pricing, no hidden charges. You know exactly what you're paying for before work begins.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We give local technicians steady work and fair pay, building a service economy that works for everyone.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-375  lg:px-9 md:px-6 px-3  mx-auto mt-10 lg:mt-20  py-12 bg-white">
      {/* Hero */}
      <section className="text-center md:mb-18 mb-14">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4640de]/10 mb-6">
          <Wrench className="w-5 h-5 text-[#4640de]" strokeWidth={1.75} />
        </div>
        <span className="inline-block text-sm font-semibold tracking-wide text-[#4640de] uppercase mb-4">
          About Our Company
        </span>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight mb-6">
          Your Trusted Partner for Innovative Digital Growth and Success
        </h1>
        <p className="text-lg font-medium text-slate-900 mb-3">
          Who We Are at Fixt it now
        </p>
        <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
          FixIt Now started with a simple frustration: finding a reliable
          technician shouldn&apos;t take a day of phone calls. So we built a
          platform where booking a trusted professional for AC service,
          cleaning, plumbing, or electrical work takes minutes, not hours.
        </p>
      </section>

      {/* Stats */}
      <section className="md:mb-18 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#4640de] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mb-18 mb-14">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl md:p-5 p-3">
          <div className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-5">
            <Target className="w-5 h-5 text-[#4640de]" strokeWidth={1.75} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-500 leading-relaxed">
            To make quality home services accessible and dependable for every
            household, by connecting people with verified technicians they can
            trust, at a price that&apos;s fair and upfront.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl md:p-5 p-3">
          <div className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-5">
            <Eye className="w-5 h-5 text-[#4640de]" strokeWidth={1.75} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h2>
          <p className="text-slate-500 leading-relaxed">
            To become the most trusted name in home services across Bangladesh,
            where booking a technician is as simple and reliable as ordering a
            ride.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="md:mb-18 mb-14">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            What We Stand For
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            The principles that guide every booking, every repair, and every
            technician we bring onto the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex items-start gap-4 md:p-5 p-3 rounded-2xl border border-slate-100"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-[#4640de]/10 flex items-center justify-center">
                <value.icon
                  className="w-5 h-5 text-[#4640de]"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1.5">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4640de] rounded-2xl md:px-6 px-3 py-14 mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to get something fixed?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8">
          Book a verified technician in minutes, or join FixIt Now as a service
          provider.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white text-[#4640de] font-medium px-6 py-3 rounded-lg hover:bg-slate-100 transition"
          >
            Book a Service
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-white font-medium px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition"
          >
            Join as a Technician
          </Link>
        </div>
      </section>
    </div>
  );
}
