"use client";

import { IBooking } from "../../technician-dashboard/_types/bookingType";

interface Props {
  booking: IBooking;
  onClose: () => void;
}

const TechnicianNoteModal = ({ booking, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          Technician Note
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {booking.service.name} — {booking.technician.name}
        </p>

        <div className="mt-4 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 whitespace-pre-wrap">
          {booking.technicianNotes?.trim() ? (
            booking.technicianNotes
          ) : (
            <span className="text-gray-400">No note added.</span>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianNoteModal;