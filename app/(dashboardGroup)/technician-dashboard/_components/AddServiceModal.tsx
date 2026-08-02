"use client";

import { ICategory } from "@/app/(publicGroup)/_types/AllTypes";

import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createService } from "../_actions/createService";

const initialState = {
  success: false,
  message: "",
};

const AddServiceModal = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(
    createService,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    startTransition(() => {
      setOpen(false);
    });
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white rounded-lg px-4 py-2 font-medium hover:opacity-90"
      >
        + Create Service
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl modal-slide-down">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-red-500 font-semibold cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Create Service
            </h2>

            <form action={formAction} className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Service Name
                </label>

                <input
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Enter service name"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Service Title
                </label>

                <input
                  name="title"
                  required
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  required
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Write description..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 font-medium">
                    Price
                  </label>

                  <input
                    name="price"
                    type="number"
                    required
                    className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-primary"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Category
                  </label>

                  <select
                    required
                    name="categoryId"
                    className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                disabled={pending}
                className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {pending ? "Creating..." : "Create Service"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddServiceModal;