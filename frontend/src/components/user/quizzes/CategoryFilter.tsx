import React from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: number;
  onSelectCategory: (categoryId: number | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategoryId ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        size="sm"
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          size="sm"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
