import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";

interface QuizFormData {
  id?: number;
  title: string;
  categoryId?: number;
  questions?: any[];
}

interface QuizFormProps {
  formData: QuizFormData;
  categories: Category[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (value: string) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  formData,
  categories,
  handleInputChange,
  handleCategoryChange,
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Select
          value={formData.categoryId?.toString()}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuizForm;
