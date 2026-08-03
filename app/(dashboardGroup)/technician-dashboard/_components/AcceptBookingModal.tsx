"use client";

import{ useState } from "react";
import { toast } from "sonner";

import { acceptBooking } from "../_actions/updateBooking";
import { IBooking } from "../_types/bookingType";

interface Props {
  booking: IBooking;
  onClose: () => void;
}

const AcceptBookingModal = ({ booking, onClose }: Props) => {
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!technicianNotes.trim()) {
      toast.error("Please add a note before accepting.");
      return;
    }

    setIsSubmitting(true);
    const res = await acceptBooking(booking.id, {
      technicianAccept: "ACCPECT",
      technicianNotes: technicianNotes.trim(),
    });
    setIsSubmitting(false);

    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md modal-slide-down rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          Accept Booking
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {booking.service.name} — {booking.customer.name}
        </p>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Technician Notes
          </label>
          <textarea
            value={technicianNotes}
            onChange={(e) => setTechnicianNotes(e.target.value)}
            rows={4}
            placeholder="e.g. I need more time, will arrive by 3pm"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border cursor-pointer border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptBookingModal;