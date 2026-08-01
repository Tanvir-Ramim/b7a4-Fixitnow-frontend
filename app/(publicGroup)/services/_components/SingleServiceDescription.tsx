import {
  BadgeDollarSign,
  FolderOpen,
  Mail,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getSingleService } from "../../_acitons/getSingleService";
import BookingWidget from "./BookingWidget";
import { IService } from "../../_types/AllTypes";


const SingleServiceDescription = async ({ id }: { id: string }) => {
  const result = await getSingleService(id);
  const service: IService = result.data;

  const { technician } = service;
  const profile = technician.profile;

  const initials = technician.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
            {/* Header */}
            <div className="relative bg-primary p-8 sm:p-10 text-white overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-black/10 blur-2xl" />
              <div className="relative">
                <span className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium tracking-wide ring-1 ring-white/20">
                  {service.category.name}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-5 leading-tight">
                  {service.title}
                </h1>
                <p className="mt-3 text-white/85 text-lg">{service.name}</p>
              </div>
            </div>

            {/* Description */}
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                About this Service
              </h2>
              <p className="mt-4 leading-8 text-gray-600">
                {service.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition hover:border-primary/30 hover:bg-primary/[0.03]">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BadgeDollarSign className="text-primary" size={18} />
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      Service Price
                    </span>
                  </div>
                  <p className="text-3xl font-bold mt-3 text-primary">
                    ৳ {service.price}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition hover:border-primary/30 hover:bg-primary/[0.03]">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FolderOpen className="text-primary" size={18} />
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      Category
                    </span>
                  </div>
                  <p className="font-semibold text-xl mt-3 text-gray-900">
                    {service.category.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technician */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-xl shadow-gray-200/50">
            <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-5">
              Your Technician
            </p>

            {/* Identity row */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold ring-4 ring-primary/10">
                  {initials}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">
                    {technician.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Professional Technician
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-100" />

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50/80 px-4 py-2.5">
                  <ShieldCheck size={16} className="text-primary" />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold">
                      {profile?.experience ?? 0}
                    </span>{" "}
                    yrs experience
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-50/80 px-4 py-2.5 min-w-0">
                  <Mail size={16} className="text-primary shrink-0" />
                  <span className="text-sm text-gray-700 truncate">
                    {technician.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile?.bio && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Quote
                    size={18}
                    className="text-primary/40 shrink-0 mt-0.5"
                  />
                  <p className="text-gray-600 leading-relaxed italic">
                    {profile.bio}
                  </p>
                </div>
              </div>
            )}

            {/* Skills */}
            {!!profile?.skills.length && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-primary" />
                  <p className="text-sm font-semibold text-gray-900">
                    Skills
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/[0.06] text-primary text-xs font-medium px-3.5 py-1.5 ring-1 ring-primary/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right — booking only */}
        <aside className="lg:sticky lg:top-8">
          <BookingWidget
            serviceId={id}
            price={service.price}
            slots={profile?.availabilities ?? []}
          />
        </aside>
      </div>
    </section>
  );
};

export default SingleServiceDescription;
