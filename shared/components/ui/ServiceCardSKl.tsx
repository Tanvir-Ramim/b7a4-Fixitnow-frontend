const ServiceCardSKl = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg p-7 animate-pulse"
        >
          {/* Background Circle */}
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gray-100" />

          {/* Top */}
          <div className="relative flex items-start justify-between">
            <div className="h-7 w-24 rounded-full bg-gray-200" />

            <div className="h-11 w-20 rounded-full bg-gray-200" />
          </div>

          {/* Title */}
          <div className="mt-6 space-y-3">
            <div className="h-7 w-5/6 rounded bg-gray-200" />
            <div className="h-7 w-3/5 rounded bg-gray-200" />
          </div>

          {/* Service Name */}
          <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />

          {/* Divider */}
          <div className="my-6 border-t border-dashed border-gray-200" />

          {/* Technician */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />

            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-5 w-36 rounded bg-gray-200" />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-5 w-24 rounded bg-gray-200" />
            </div>

            <div className="h-11 w-32 rounded-xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSKl;