"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  MapPin,
  StickyNote,
} from "lucide-react";
import { IAvailability } from "../../_types/AllTypes";
 // adjust to your actual types path

const BookingWidget = ({
  serviceId,
  price,
  slots,
}: {
  serviceId: string;
  price: number;
  slots: IAvailability[];
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canBook = Boolean(selectedSlotId) && address.trim().length > 0;
  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  const handleSlotClick = (slot: IAvailability) => {
    if (!slot.isSlotActive) {
      toast.error("This slot is already booked", {
        description: "Please choose another available time.",
      });
      return;
    }
    setSelectedSlotId(slot.id);
  };

  const handleBook = async () => {
    if (!canBook) return;
    setSubmitting(true);
    try {
      // TODO: wire up to your booking server action, e.g.
      // await createBooking({ serviceId, slotId: selectedSlotId, address, notes });
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Booking request sent", {
        description: "The technician will confirm your slot shortly.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try booking again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
      <div className="p-6 sm:p-7">
        <h3 className="text-lg font-bold text-gray-900">Book This Service</h3>
        <p className="text-sm text-gray-500 mt-0.5">
          Choose a time, then confirm your address.
        </p>

        {/* Step 1 — slots */}
        <div className="mt-6">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
            1. Choose a time
          </p>

          <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-0.5">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isDisabled = !slot.isSlotActive;

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotClick(slot)}
                  aria-disabled={isDisabled}
                  className={`text-left rounded-xl border p-3 transition
                    ${
                      isDisabled
                        ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                        : isSelected
                        ? "border-primary bg-primary/[0.06] ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-primary/40 hover:bg-primary/[0.02]"
                    }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`flex items-center gap-1.5 text-[13px] font-semibold ${
                        isDisabled ? "text-gray-400" : "text-primary"
                      }`}
                    >
                      <CalendarDays size={14} />
                      {new Date(slot.slotDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {isDisabled ? (
                      <Lock size={12} className="text-gray-400 shrink-0" />
                    ) : isSelected ? (
                      <CheckCircle2
                        size={15}
                        className="text-primary shrink-0"
                      />
                    ) : null}
                  </div>
                  <div
                    className={`mt-1.5 flex items-center gap-1.5 text-xs ${
                      isDisabled ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Clock3 size={12} />
                    {slot.startTime}–{slot.endTime}
                  </div>
                </button>
              );
            })}

            {!slots.length && (
              <p className="col-span-2 text-sm text-gray-400 text-center py-6">
                No slots available right now.
              </p>
            )}
          </div>
        </div>

        {/* Step 2 — details */}
        <div className="mt-7">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
            2. Your details
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5"
              >
                <MapPin size={15} className="text-primary" />
                Address
                <span className="text-red-500">*</span>
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, road, area, city"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5"
              >
                <StickyNote size={15} className="text-primary" />
                Notes
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything the technician should know"
                rows={2}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer — summary + CTA */}
      <div className="border-t border-gray-100 bg-gray-50/60 p-6 sm:p-7">
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-gray-500">
            {selectedSlot ? (
              <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                <CheckCircle2 size={14} className="text-primary" />
                {new Date(selectedSlot.slotDate).toLocaleDateString(
                  undefined,
                  { weekday: "short", month: "short", day: "numeric" }
                )}
                , {selectedSlot.startTime}
              </span>
            ) : (
              "No time selected yet"
            )}
          </span>
          <span className="text-lg font-bold text-primary">৳ {price}</span>
        </div>

        <button
          onClick={handleBook}
          disabled={!canBook || submitting}
          className={`w-full rounded-xl py-3.5 font-semibold transition
            ${
              canBook && !submitting
                ? "bg-primary text-white hover:opacity-90 active:scale-[0.99]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {submitting ? "Booking..." : "Book This Service"}
        </button>

        {!canBook && (
          <p className="text-xs text-gray-400 text-center mt-3">
            Select a slot and enter your address to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
