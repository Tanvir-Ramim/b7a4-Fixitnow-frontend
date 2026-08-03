"use client";

import { useMemo, useState, useTransition } from "react";
import { IUser } from "../_type/cateogoryTypes";
import { updateProfileAction } from "../../_actions/profileActions";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

const AdminProfile = ({ user }: { user: IUser }) => {
  const [isPending, startTransition] = useTransition();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user.profile?.bio ?? "");
  const [experience, setExperience] = useState(
    String(user.profile?.experience ?? 0),
  );
  const [skills, setSkills] = useState<string[]>(user.profile?.skills ?? []);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initials = useMemo(
    () => initialsOf(name || user.name),
    [name, user.name],
  );

  function enterEditMode() {
    setSaveError(null);
    setSaveSuccess(false);
    setEditMode(true);
  }

  function cancelEdit() {
    setName(user.name);
    setBio(user.profile?.bio ?? "");
    setSaveError(null);
    setEditMode(false);
  }

  function handleSave() {
    setSaveError(null);
    setSaveSuccess(false);

    const parsedExperience = Number(experience);
    if (!name.trim()) {
      setSaveError("Name can't be empty.");
      return;
    }
    if (Number.isNaN(parsedExperience) || parsedExperience < 0) {
      setSaveError("Experience must be a valid number of years.");
      return;
    }

    startTransition(async () => {
      const result = await updateProfileAction({
        name: name.trim(),
        bio: bio.trim(),
      });

      if (result.success) {
        setSaveSuccess(true);
        setEditMode(false);
      } else {
        setSaveError(result.message || "Failed to update profile.");
      }
    });
  }

  return (
    <div className=" bg-[#F6F6FB]    font-sans text-[#111827] ">
      <div className=" space-y-6">
        <div className="overflow-hidden rounded-2xl border border-[#E7E7F3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_-4px_rgba(70,64,222,0.10)]">
          <div className="relative h-28 bg-gradient-to-r from-[#4640DE] to-[#6C63FF]">
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
          </div>

          <div className="px-2 pb-8 sm:px-10">
            <div className="-mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="flex items-end gap-4">
                <div className="flex h-16 z-10 w-16 mt-8 flex-none items-center justify-center rounded-2xl border-4 border-white bg-[#4640DE] text-2xl font-semibold text-white shadow-md">
                  {initials || "?"}
                </div>
                <div className="pb-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEDFC] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#4640DE]">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex flex-none items-center gap-2 pb-1">
                {!editMode ? (
                  <button
                    type="button"
                    onClick={enterEditMode}
                    className="inline-flex items-center cursor-pointer gap-2 rounded-lg bg-[#4640DE] px-4 sm:py-2.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3934B8] active:bg-[#302BA0]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      disabled={isPending}
                      className="rounded-lg border cursor-pointer border-[#E5E7EB] bg-white px-4 sm:py-2.5 py-2 text-sm font-semibold text-[#4B5563] transition hover:bg-[#F9FAFB] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isPending}
                      className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-[#4640DE] px-4 sm:py-2.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3934B8] disabled:opacity-60"
                    >
                      {isPending && (
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="3"
                            opacity="0.3"
                          />
                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {isPending ? "Saving" : "Save changes"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Name + email */}
            <div className="mt-5">
              <h1 className="sm:text-2xl  text-xl capitalize font-semibold tracking-tight text-[#111827]">
                {name}
              </h1>

              <p className="mt-1 text-sm text-[#6B7280]">{user.email}</p>
            </div>

            {saveError && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-3.5 py-2.5 text-sm text-[#B91C1C]">
                <span>{saveError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-[#86EFAC] bg-[#F0FDF4] px-3.5 py-2.5 text-sm text-[#15803D]">
                <span>Profile updated successfully.</span>
              </div>
            )}

            <div className="my-4 h-px w-full bg-[#EEF0F3]" />

            {/* Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={!editMode}
                  rows={3}
                  placeholder="A short summary of your background…"
                  className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                    editMode
                      ? "border-[#4640DE] bg-white text-[#111827] ring-4 ring-[#4640DE]/10"
                      : "border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]"
                  }`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-2.5 text-sm text-[#6B7280] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
