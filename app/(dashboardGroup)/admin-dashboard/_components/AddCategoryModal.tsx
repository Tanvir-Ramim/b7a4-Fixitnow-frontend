// _components/AddCategoryModal.tsx
"use client";

import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createCategoryService } from "../_actions/categoryAction";

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sortDescriptoin, setSortDescriptoin] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    startTransition(async () => {
      const res = await createCategoryService({ name, sortDescriptoin });
      if (res.success) {
        toast.success("Category created");
        setName("");
        setSortDescriptoin("");
        setOpen(false);
      } else {
        toast.error(res.message ?? "Failed to create category");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center cursor-pointer gap-2 text-sm rounded-xl bg-primary px-4 py-2 text-white"
      >
        <Plus size={18} />
        Add Category
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md modal-slide-down rounded-xl bg-white p-6">
            <p className="mb-4 text-base font-bold text-gray-900">
              Add Category
            </p>

            <div className="flex flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                className="rounded-lg border border-gray-300 p-2"
              />
              <input
                value={sortDescriptoin}
                onChange={(e) => setSortDescriptoin(e.target.value)}
                placeholder="Short description"
                className="rounded-lg border border-gray-300 p-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg text-sm cursor-pointer border border-gray-500 px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="rounded-lg text-sm  cursor-pointer bg-primary px-4 py-2 text-white disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategoryModal;
