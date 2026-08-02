"use client";

import { useState } from "react";

const DescriptionModal = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);

  const shortDescription =
    description.length > 20 ? `${description.slice(0, 20)}...` : description;

  return (
    <>
      <div className="text-gray-600">
        <span>{shortDescription}</span>

        {description.length > 20 && (
          <button
            onClick={() => setOpen(true)}
            className="ml-2 font-medium text-blue-600 hover:underline"
          >
            More
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300/40">
          <div className="bg-white rounded-lg p-6 w-150 modal-slide-down relative">
            <button
              className="absolute  cursor-pointer top-3 right-3 text-red-400"
              onClick={() => setOpen(false)}
            >
              close
            </button>
            <div className="space-y-2 flex flex-wrap overflow-auto mt-3">
              <div className="w-150 text-black">{description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DescriptionModal;
