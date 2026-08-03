"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { ICategory } from "../../_types/AllTypes";

const ServiceSearchBar = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname
    );
  };

  const handleNameChange = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateQuery("name", value);
    }, 500);
  };

  const handleCategoryChange = (value: string) => {
    updateQuery("categoryId", value);
  };

  const handleReset = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (selectRef.current) {
      selectRef.current.value = "";
    }

    router.replace(pathname);
  };

  return (
    <div className="flex md:mt-12 mt-4 md:flex-row flex-col md:items-center md:justify-end gap-3">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search service..."
        defaultValue={searchParams.get("name") ?? ""}
        onChange={(e) => handleNameChange(e.target.value)}
        className="md:w-64 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <select
        ref={selectRef}
        defaultValue={searchParams.get("categoryId") ?? ""}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="md:w-52 w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleReset}
        className="rounded-lg border cursor-pointer border-primary px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
      >
        Reset
      </button>
    </div>
  );
};

export default ServiceSearchBar;