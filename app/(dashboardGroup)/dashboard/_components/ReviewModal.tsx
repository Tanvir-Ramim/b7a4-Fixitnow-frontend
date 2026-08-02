"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { IBooking } from "../../technician-dashboard/_types/bookingType";
import { submitReview } from "../_actions/reviewPostAction";

interface Props {
  booking: IBooking;
  onClose: () => void;
  onSuccess: () => void;
}

interface SubmittedReview {
  rating: number;
  comment: string;
}

const ReviewModal = ({ booking, onClose, onSuccess }: Props) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {},
  );

  // If the booking already has a review, or we just submitted one,
  // show it instead of the form.
  const [submittedReview, setSubmittedReview] = useState<SubmittedReview | null>(
    booking.review
      ? { rating: booking.review.rating, comment: booking.review.comment }
      : null,
  );

  const validate = () => {
    const nextErrors: { rating?: string; comment?: string } = {};
    if (rating < 1 || rating > 5) {
      nextErrors.rating = "Please select a rating from 1 to 5.";
    }
    if (!comment.trim()) {
      nextErrors.comment = "Please write a comment.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    const res = await submitReview({
      bookingId: booking.id,
      rating,
      comment: comment.trim(),
    });
    setIsSubmitting(false);

    if (res.success) {
      toast.success(res.message);
      setSubmittedReview({ rating, comment: comment.trim() });
      onSuccess(); // refresh data in the background, but keep modal open
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          {submittedReview ? "Your Review" : "Leave a Review"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {booking.service.name} — {booking.technician.name}
        </p>

        {submittedReview ? (
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
                      star <= submittedReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {submittedReview.rating}/5
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Comment
              </label>
              <p className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 whitespace-pre-wrap">
                {submittedReview.comment}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={26}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
                )}
              </div>
              {errors.rating && (
                <p className="mt-1 text-xs text-red-600">{errors.rating}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Share your experience..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.comment && (
                <p className="mt-1 text-xs text-red-600">{errors.comment}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;