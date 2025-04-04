import React from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface CategoryListProps {
  categories: Category[];
  onDelete: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onDelete,
}) => {
  return (
    <div className="grid gap-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex justify-between items-center p-3 border rounded"
        >
          <span>{category.name}</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
