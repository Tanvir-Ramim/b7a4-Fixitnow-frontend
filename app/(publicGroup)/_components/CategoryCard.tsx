// CategoryCard.tsx
import React from "react";

import { ChartBarStacked } from "lucide-react";
import { CategoryType } from "../_types/AllTypes";
import { ListChecks } from 'lucide-react';
interface Props {
  item: CategoryType;
}

const CategoryCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="group cursor-pointer border border-gray-200 bg-white lg:p-6 md:p-4 p-3.5 transition-all duration-500 hover:bg-blue-600">
      <div className="md:mb-4 mb-2 transition-all duration-500 group-hover:brightness-0 group-hover:invert">
        <ChartBarStacked size={33} />
      </div>

      <h3 className="lg:text-2xl md:text-xl text-lg font-semibold text-gray-800 transition-all duration-500 group-hover:text-white">
        {item.title}
      </h3>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-gray-500 md:text-lg text-base transition-all duration-500 group-hover:text-white">
          {item.total}
        </p>

        <ListChecks className="text-gray-500 transition-all duration-500 group-hover:text-white" />
      </div>
    </div>
  );
};

export default CategoryCard;
