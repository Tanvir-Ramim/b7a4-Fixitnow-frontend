"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { IBooking } from "../../technician-dashboard/_types/bookingType";
import ReviewModal from "./ReviewModal";
import TechnicianNoteModal from "./TechnicianNoteModal";
import { checkoutPayment } from "../_actions/paymentAction";

const statusStyles: Record<string, { dot: string; text: string }> = {
  ACCPECT: { dot: "bg-green-500", text: "text-green-700" },
  INPROGRESS: { dot: "bg-blue-500", text: "text-blue-700" },
  CANCEL: { dot: "bg-red-500", text: "text-red-700" },
  PENDING: { dot: "bg-yellow-500", text: "text-yellow-700" },
};

const formatSlotDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const CustomerBookingTableClient = ({ bookings }: { bookings: IBooking[] }) => {
  const router = useRouter();
  const [reviewBooking, setReviewBooking] = useState<IBooking | null>(null);
  const [noteBooking, setNoteBooking] = useState<IBooking | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const handlePay = async (booking: IBooking) => {
    setPayingId(booking.id);
    const res = await checkoutPayment(booking.id);
    setPayingId(null);

    if (res.success) {
      const paymentUrl = res.data?.result?.paymentUrl;

      if (paymentUrl) {
        toast.success(res.message);
        window.location.assign(paymentUrl);
      } else {
        toast.error("Payment URL not received.");
      }
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-275 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Technician</th>
            <th className="p-4">Service</th>
            <th className="p-4">Price</th>
            <th className="p-4">Booking Time</th>
            <th className="p-4">Address</th>
            <th className="p-4">Customer Note</th>
            <th className="p-4 text-center">Tech Note</th>
            <th className="p-4 text-center">Payment</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Complete</th>
            <th className="p-4 text-center">Review</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const status =
                statusStyles[booking.technicianAccept] ?? statusStyles.PENDING;
              const isAccepted = booking.technicianAccept === "ACCPECT";

              return (
                <tr
                  key={booking.id}
                  className="border-t border-gray-200 transition hover:bg-gray-50 text-sm"
                >
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {booking.technician.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {booking.technician.email}
                    </div>
                  </td>
                  <td className="p-4">{booking.service.name}</td>
                  <td className="p-4">${booking.service.price}</td>
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
                    {booking.technicianNotes?.trim() ? (
                      <button
                        onClick={() => setNoteBooking(booking)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        View Note
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {booking.isPayment ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : isAccepted ? (
                      <button
                        onClick={() => handlePay(booking)}
                        disabled={payingId === booking.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 transition"
                      >
                        {payingId === booking.id ? "..." : "Pay Now"}
                      </button>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        Unpaid
                      </span>
                    )}
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.isComplete
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {booking.isComplete ? "True" : "False"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {booking.isComplete ? (
                      <button
                        onClick={() => setReviewBooking(booking)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        Review
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11} className="py-10 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          onClose={() => setReviewBooking(null)}
          onSuccess={() => router.refresh()}
        />
      )}

      {noteBooking && (
        <TechnicianNoteModal
          booking={noteBooking}
          onClose={() => setNoteBooking(null)}
        />
      )}
    </div>
  );
};

export default CustomerBookingTableClient;
