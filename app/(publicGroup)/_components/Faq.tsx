"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I book a service on FixIt Now?",
    answer:
      "Choose the service you need — AC service, cleaning, plumbing, electrical, or more — fill in your address and a few details about the issue, and submit your request. We'll match you with a verified technician right away.",
  },
  {
    id: 2,
    question: "Are your technicians verified?",
    answer:
      "Yes. Every technician on FixIt Now goes through identity and background checks before they're allowed to accept bookings, so you can have someone trustworthy at your door.",
  },
  {
    id: 3,
    question: "How much will my service cost?",
    answer:
      "You'll see an estimated price when you book. If a technician finds extra work is needed once on site, they'll let you know the updated cost before starting, so there are no surprises.",
  },
  {
    id: 4,
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes, you can reschedule or cancel free of charge up to 2 hours before your appointment. Cancellations made after that may include a small fee to cover the technician's time.",
  },
  {
    id: 5,
    question: "Which areas do you currently serve?",
    answer:
      "We currently operate across Dhaka and are steadily expanding to more areas. Enter your address at checkout and we'll confirm right away if we can serve your location.",
  },
];

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(1);

  const toggleFaq = (id: number) => {
    setActiveFaq((prev) => (prev === id ? 0 : id));
  };

  return (
    <div className="flex max-w-375 lg:px-9 md:px-6 px-3 mx-auto md:space-y-8 space-y-6 bg-white lg:flex-row new_container  sm:py-20 py-12 flex-col items-center h-full lg:gap-8 gap-4">
      <div className="lg:w-[50%] lg:text-start sm:text-center text-start">
        <span className="inline-block text-2xl font-semibold tracking-wide text-[#4640de] uppercase mb-3">
          FAQ
        </span>
        <h1 className="xs:text-2xl text-black text-2xl lg:text-3xl font-medium mb-3 tracking-wider">
          Welcome To Our FAQ Section!
        </h1>
        <p className="text-[#888888] xs:text-[16px] text-[14px] font-medium">
          Here, you will find answers to the questions we get asked the most.
          If you have further inquiries, please don&apos;t hesitate to
          contact us.{" "}
        </p>
      </div>
      <div className="lg:w-[50%] w-full">
        <div>
          {faqs.map(({ id, question, answer }) => {
            const isActive = activeFaq === id;
            return (
              <div
                key={id}
                className={`bg-[#F4F5F9] rounded-md mb-2 cursor-pointer border ${
                  isActive ? "border-[#4640de]/10" : "border-transparent"
                }`}
                onClick={() => toggleFaq(id)}
              >
                <div className="flex justify-between items-center bg-[#F4F5F9] px-4 pt-4 pb-3 rounded-md">
                  <p
                    className={`md:text-base text-sm font-medium ${
                      isActive ? "text-[#4640de]" : "text-black/70"
                    }`}
                  >
                    {question}
                  </p>
                  {isActive ? (
                    <Minus className="text-[#4640de] shrink-0" size={18} />
                  ) : (
                    <Plus className="text-[#888888] shrink-0" size={18} />
                  )}
                </div>

                <p
                  className={`text-sm text-[#888888] px-4 pb-0 duration-500 ${
                    isActive
                      ? "opacity-100 xs:h-[94px] md:h-[100px] h-[130px] pt-2 pb-4"
                      : "h-0 opacity-0"
                  } `}
                >
                  {answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
