// _components/UserStatusButton.tsx
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateUserStatus } from "../_actions/userActions";


const UserStatusButton = ({
  userId,
  activeStatus,
}: {
  userId: string;
  activeStatus: "ACTIVE" | "BANNED";
}) => {
  const [isPending, startTransition] = useTransition();
  const isActive = activeStatus === "ACTIVE";

  const handleToggle = () => {
    const nextStatus = isActive ? "BANNED" : "ACTIVE";

    startTransition(async () => {
      const res = await updateUserStatus(userId, nextStatus);
      if (res.success) {
        toast.success(
          nextStatus === "ACTIVE" ? "User activated" : "User banned"
        );
      } else {
        toast.error(res.message ?? "Failed to update status");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`rounded-lg cursor-pointer px-3 py-1.5 text-sm font-medium disabled:opacity-50 ${
        isActive
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-green-50 text-green-600 hover:bg-green-100"
      }`}
    >
      {isPending ? "..." : isActive ? "Ban" : "Activate"}
    </button>
  );
};

export default UserStatusButton;