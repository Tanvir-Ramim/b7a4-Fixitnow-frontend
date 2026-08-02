// _components/CategoryDeleteButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCategoryService } from "../_actions/categoryAction";


const CategoryDeleteButton = ({ categoryId }: { categoryId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCategoryService(categoryId);
      if (res.success) {
        toast.success("Category deleted");
      } else {
        toast.error(res.message ?? "Failed to delete category");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
};

export default CategoryDeleteButton;