/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Trash2, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { deleteService } from "../_actions/deleteTechServices";

export default function ServiceDeleteButton({
  serviceId,
}: {
  serviceId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      await deleteService(serviceId);

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Service deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      startTransition(() => {
        router.refresh();
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleDelete}
      className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}
