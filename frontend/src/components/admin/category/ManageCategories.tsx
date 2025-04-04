import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/services/api/api";
import { Category } from "@/types";
import LoadingSpinner from "../../LoadingSpinner";
import EmptyState from "../../EmptyState";
import CategoryList from "./CategoryList";

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      await categoryService.create(newCategoryName);
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await categoryService.delete(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={handleCreateCategory}>Add</Button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : categories.length === 0 ? (
          <EmptyState message="No categories available" />
        ) : (
          <CategoryList
            categories={categories}
            onDelete={handleDeleteCategory}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ManageCategories;
