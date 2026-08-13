"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // No backend call yet — this just simulates a message being sent.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 600);
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-2">
        <div className="w-14 h-14 rounded-full bg-[#4640de]/10 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-7 h-7 text-[#4640de]" strokeWidth={1.75} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Message sent
        </h3>
        <p className="text-slate-500 max-w-sm mb-8">
          Thank you for reaching out. We&apos;ll connect with you shortly.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-sm font-medium text-[#4640de] hover:underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4640de]/30 focus:border-[#4640de] transition"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4640de]/30 focus:border-[#4640de] transition"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="01XXX-XXXXXX"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4640de]/30 focus:border-[#4640de] transition"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4640de]/30 focus:border-[#4640de] transition"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4640de]/30 focus:border-[#4640de] transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#4640de] cursor-pointer hover:bg-[#3a35bd] disabled:opacity-60 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
