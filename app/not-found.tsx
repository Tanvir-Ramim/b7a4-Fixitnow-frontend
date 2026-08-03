import Link from "next/link";
import { SearchX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 text-center">
      <div className="flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <SearchX className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 */}
        <h1 className="bannerText text-7xl font-bold tracking-widest text-gray-800 sm:text-8xl">
          4<span className="text-primary">0</span>4
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-700 sm:text-2xl">
            Page Not Found
          </h2>
          <p className="max-w-sm text-sm text-gray-500 sm:text-base">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or doesn&apos;t exist.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>

          <Link
            href="/services"
            className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}