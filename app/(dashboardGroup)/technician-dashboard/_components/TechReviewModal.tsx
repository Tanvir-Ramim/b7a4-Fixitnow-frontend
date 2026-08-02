"use client";


import { Star } from "lucide-react";

import { IBooking } from "../_types/bookingType";

interface Props {
  booking: IBooking;
  onClose: () => void;
}

const TechReviewModal = ({ booking, onClose }: Props) => {
  const review = booking.review;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">Customer Review</h2>
        <p className="mt-1 text-sm text-gray-500">
          {booking.service.name} — {booking.customer.name}
        </p>

        {review ? (
          <>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={26}
                    className={
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {review.rating}/5
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Comment
              </label>
              <p className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 whitespace-pre-wrap">
                {review.comment}
              </p>
            </div>
          </>
        ) : (
          <p className="mt-5 text-sm text-gray-500">
            No review has been left for this booking yet.
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechReviewModal;