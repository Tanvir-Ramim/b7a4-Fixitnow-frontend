
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  service: {
    id: string;
    name: string;
    title: string;
    price: number;
    technician: {
      name: string;
    };
    category: {
      name: string;
    };
  };
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group  relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/10 transition-all duration-500 group-hover:scale-150" />
      {/* <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-primary/5" /> */}

      <div className="relative p-7">

        <div className="flex items-start justify-between">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
            {service.category.name}
          </span>

          <span className="rounded-full bg-primary px-4 py-2  font-bold text-white shadow-lg">
            ৳{service.price}
          </span>
        </div>

        <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
          {service.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-gray-500">{service.name}</p>

        <div className="my-5 border-t border-dashed border-gray-200" />
        <div className="flex items-center gap-4">

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Technician
            </p>

            <p className="font-semibold text-gray-900">
              {service.technician.name}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Category</p>

            <p className="font-semibold text-gray-800">
              {service.category.name}
            </p>
          </div>

          <Link
            href={`/services/${service.id}`}
            className="group/button flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
          >
            Details
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/button:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
