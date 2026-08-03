"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { completeBooking } from "../_actions/updateBooking";

import { IBooking } from "../_types/bookingType";
import AcceptBookingModal from "./AcceptBookingModal";
import TechReviewModal from "./TechReviewModal";

const statusStyles: Record<string, { dot: string; text: string }> = {
  PENDING: { dot: "bg-yellow-500", text: "text-yellow-700" },
  ACCPECT: { dot: "bg-green-500", text: "text-green-700" },
  INPROGRESS: { dot: "bg-blue-500", text: "text-blue-700" },
  REJECTED: { dot: "bg-red-500", text: "text-red-700" },
};

const formatSlotDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BookingTableClient = ({ bookings }: { bookings: IBooking[] }) => {
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [reviewBooking, setReviewBooking] = useState<IBooking | null>(null);

  const handleComplete = async (booking: IBooking) => {
    if (!booking.isPayment) {
      toast.error("Payment not received. Cannot mark as complete.");
      return;
    }
    if (booking.isComplete) return;

    setCompletingId(booking.id);
    const res = await completeBooking(booking.id);
    setCompletingId(null);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-275 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Customer</th>
            <th className="p-4">Service</th>
            <th className="p-4">Price</th>
            <th className="p-4">Booking Time</th>
            <th className="p-4">Address</th>
            <th className="p-4">Customer Note</th>
            <th className="p-4 text-center">Payment</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Review</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const status =
                statusStyles[booking.technicianAccept] ?? statusStyles.PENDING;
              const isAccepted = booking.technicianAccept === "ACCPECT";
              const canComplete =
                isAccepted && booking.isPayment && !booking.isComplete;

              return (
                <tr
                  key={booking.id}
                  className="border-t border-gray-200 transition hover:bg-gray-50 text-sm"
                >
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {booking.customer.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {booking.customer.email}
                    </div>
                  </td>
                  <td className="p-4">{booking.service.name}</td>
                  <td className="p-4 text-green-600">৳{booking.service.price}</td>
                  <td className="p-4 whitespace-nowrap">
                    <div>{formatSlotDate(booking.bookingTime.slotDate)}</div>
                    <div className="text-gray-500 text-xs">
                      {booking.bookingTime.startTime} –{" "}
                      {booking.bookingTime.endTime}
                    </div>
                  </td>
                  <td
                    className="p-4 max-w-[160px] truncate"
                    title={booking.address}
                  >
                    {booking.address}
                  </td>
                  <td
                    className="p-4 max-w-[180px] truncate"
                    title={booking.customerNotes}
                  >
                    {booking.customerNotes || "—"}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.isPayment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.isPayment ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${status.dot}`}
                      />
                      <span className={`text-xs font-medium ${status.text}`}>
                        {booking.technicianAccept}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {booking.review ? (
                      <button
                        onClick={() => setReviewBooking(booking)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        View Review
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        disabled={isAccepted}
                        className="px-3 py-1.5 cursor-pointer rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                      >
                        {isAccepted ? "Accepted" : "Accept"}
                      </button>
                      <button
                        onClick={() => handleComplete(booking)}
                        disabled={!canComplete || completingId === booking.id}
                        className="px-3 py-1.5 cursor-pointer rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                      >
                        {booking.isComplete
                          ? "Completed"
                          : completingId === booking.id
                            ? "..."
                            : "Complete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} className="py-10 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBooking && (
        <AcceptBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {reviewBooking && (
        <TechReviewModal
          booking={reviewBooking}
          onClose={() => setReviewBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingTableClient;