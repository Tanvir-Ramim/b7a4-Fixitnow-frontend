"use client";

import  { useMemo, useState, useTransition } from "react";
import { IUser } from "@/app/(publicGroup)/_types/ProfileTypes";
import { addAvailabilityAction, updateProfileAction } from "../../_actions/profileActions";


function formatSlotDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function dateInputToApi(value: string) {
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}


function timeInputToApi(value: string) {
  const [hStr, mStr] = value.split(":");
  if (!hStr || !mStr) return value;
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "pm" : "am";
  h = h % 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, "0")}:${mStr} ${suffix}`;
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}



const ProfileSection = ({ user }: { user: IUser }) => {
  const [isPending, startTransition] = useTransition();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.profile?.bio ?? "");
  const [experience, setExperience] = useState(
    String(user.profile?.experience ?? 0)
  );
  const [skills, setSkills] = useState<string[]>(user.profile?.skills ?? []);
  const [skillDraft, setSkillDraft] = useState("");

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [availabilities, setAvailabilities] = useState(
    user.profile?.availabilities ?? []
  );
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [slotError, setSlotError] = useState<string | null>(null);
  const [slotSuccess, setSlotSuccess] = useState(false);
  const [isSlotPending, startSlotTransition] = useTransition();

  const initials = useMemo(
    () => initialsOf(name || user.name),
    [name, user.name]
  );

  function enterEditMode() {
    setSaveError(null);
    setSaveSuccess(false);
    setEditMode(true);
  }

  function cancelEdit() {
    setName(user.name);
    setBio(user.profile?.bio ?? "");
    setExperience(String(user.profile?.experience ?? 0));
    setSkills(user.profile?.skills ?? []);
    setSkillDraft("");
    setSaveError(null);
    setEditMode(false);
  }

  function addSkill() {
    const s = skillDraft.trim();
    if (!s) return;
    if (skills.includes(s)) {
      setSkillDraft("");
      return;
    }
    setSkills((prev) => [...prev, s]);
    setSkillDraft("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
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
        experience: parsedExperience,
        skills,
      });

      if (result.success) {
        setSaveSuccess(true);
        setEditMode(false);
      } else {
        setSaveError(result.message || "Failed to update profile.");
      }
    });
  }

  function handleAddSlot() {
    setSlotError(null);
    setSlotSuccess(false);

    if (!slotDate || !slotStart || !slotEnd) {
      setSlotError("Fill in date, start time, and end time.");
      return;
    }

    const payload = {
      slotDate: dateInputToApi(slotDate),
      startTime: timeInputToApi(slotStart),
      endTime: timeInputToApi(slotEnd),
    };

    startSlotTransition(async () => {
      const result = await addAvailabilityAction(payload);

      if (result.success) {
        setSlotSuccess(true);
        setAvailabilities((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            slotDate: new Date(
              Number(slotDate.split("-")[0]),
              Number(slotDate.split("-")[1]) - 1,
              Number(slotDate.split("-")[2])
            ).toISOString(),
            startTime: payload.startTime,
            endTime: payload.endTime,
            isSlotActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            profileId: "",
          },
        ]);
        setSlotDate("");
        setSlotStart("");
        setSlotEnd("");
        setShowAddSlot(false);
      } else {
        setSlotError(result.message || "Failed to add availability slot.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#F6F6FB] px-4 py-10 font-sans text-[#111827] sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="overflow-hidden rounded-2xl border border-[#E7E7F3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_-4px_rgba(70,64,222,0.10)]">
    
          <div className="relative h-28 bg-gradient-to-r from-[#4640DE] to-[#6C63FF]">
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
          </div>

          <div className="px-6 pb-8 sm:px-10">
      
            <div className="-mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl border-4 border-white bg-[#4640DE] text-2xl font-semibold text-white shadow-md">
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
                    className="inline-flex items-center gap-2 rounded-lg bg-[#4640DE] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3934B8] active:bg-[#302BA0]"
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
                      className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#4B5563] transition hover:bg-[#F9FAFB] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isPending}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#4640DE] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3934B8] disabled:opacity-60"
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
              {editMode ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full max-w-sm rounded-lg border border-[#4640DE] bg-white px-3 py-2 text-xl font-semibold text-[#111827] outline-none ring-4 ring-[#4640DE]/10"
                />
              ) : (
                <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
                  {name}
                </h1>
              )}
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

            <div className="my-7 h-px w-full bg-[#EEF0F3]" />

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
                  Experience (years)
                </label>
                <input
                  type="number"
                  min={0}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disabled={!editMode}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
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

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                  Skills
                </label>

                <div
                  className={`flex min-h-[48px] flex-wrap items-center gap-2 rounded-lg border px-3.5 py-2.5 transition ${
                    editMode
                      ? "border-[#4640DE] bg-white ring-4 ring-[#4640DE]/10"
                      : "border-[#E5E7EB] bg-[#F9FAFB]"
                  }`}
                >
                  {skills?.length === 0 && !editMode && (
                    <span className="text-sm text-[#9CA3AF]">
                      No skills added yet.
                    </span>
                  )}

                  {skills?.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEDFC] px-3 py-1 text-xs font-medium text-[#4640DE]"
                    >
                      {skill}
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-[#4640DE]/60 hover:text-[#4640DE]"
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}

                  {editMode && (
                    <input
                      value={skillDraft}
                      onChange={(e) => setSkillDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="Type a skill, press Enter"
                      className="min-w-[140px] flex-1 bg-transparent text-sm outline-none placeholder:text-[#B3BAC4]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E7E7F3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_-4px_rgba(70,64,222,0.10)]">
          <div className="flex items-center justify-between border-b border-[#EEF0F3] px-6 py-5 sm:px-10">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">
                Availability
              </h2>
              <p className="mt-0.5 text-sm text-[#6B7280]">
                Let dispatch know the hours you are free for jobs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSlotError(null);
                setSlotSuccess(false);
                setShowAddSlot((v) => !v);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#4640DE] px-3.5 py-2 text-sm font-semibold text-[#4640DE] transition hover:bg-[#EEEDFC]"
            >
              {showAddSlot ? (
                "Close"
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add slot
                </>
              )}
            </button>
          </div>

          <div className="px-6 py-6 sm:px-10">
            {showAddSlot && (
              <div className="mb-6 rounded-xl border border-[#E7E7F3] bg-[#FAFAFD] p-5">
                {slotError && (
                  <div className="mb-4 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-3.5 py-2.5 text-sm text-[#B91C1C]">
                    {slotError}
                  </div>
                )}
                {slotSuccess && (
                  <div className="mb-4 rounded-lg border border-[#86EFAC] bg-[#F0FDF4] px-3.5 py-2.5 text-sm text-[#15803D]">
                    Slot added.
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                      Date
                    </label>
                    <input
                      type="date"
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                      className="w-full rounded-lg border border-[#D9D9EC] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#4640DE] focus:ring-4 focus:ring-[#4640DE]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                      Start time
                    </label>
                    <input
                      type="time"
                      value={slotStart}
                      onChange={(e) => setSlotStart(e.target.value)}
                      className="w-full rounded-lg border border-[#D9D9EC] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#4640DE] focus:ring-4 focus:ring-[#4640DE]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                      End time
                    </label>
                    <input
                      type="time"
                      value={slotEnd}
                      onChange={(e) => setSlotEnd(e.target.value)}
                      className="w-full rounded-lg border border-[#D9D9EC] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#4640DE] focus:ring-4 focus:ring-[#4640DE]/10"
                    />
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddSlot}
                    disabled={isSlotPending}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#4640DE] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3934B8] disabled:opacity-60"
                  >
                    {isSlotPending ? "Adding…" : "Add slot"}
                  </button>
                </div>
              </div>
            )}

            {availabilities.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#E5E7EB] px-6 py-10 text-center">
                <p className="text-sm text-[#9CA3AF]">
                  No availability slots yet. Add one to let dispatch know
                  when you are free.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {availabilities.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-4 rounded-xl border border-[#EEF0F3] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D9D9EC]"
                  >
                    <div className="h-full w-1 flex-none self-stretch rounded-full bg-[#4640DE]" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#111827]">
                        {formatSlotDate(slot.slotDate)}
                      </p>
                      <p className="mt-0.5 text-sm text-[#6B7280]">
                        {slot.startTime} – {slot.endTime}
                      </p>
                    </div>
                    <span
                      className={`inline-flex flex-none items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        slot.isSlotActive
                          ? "bg-[#F0FDF4] text-[#15803D]"
                          : "bg-[#F3F4F6] text-[#6B7280]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          slot.isSlotActive ? "bg-[#22C55E]" : "bg-[#9CA3AF]"
                        }`}
                      />
                      {slot.isSlotActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
