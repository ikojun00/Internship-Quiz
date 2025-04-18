import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { quizService, categoryService, QuizData } from "@/services/api/base";
import { Category } from "@/types";
import LoadingSpinner from "../../LoadingSpinner";
import EmptyState from "../../EmptyState";
import QuizForm from "./QuizForm";
import QuizTable from "./QuizTable";

const ManageQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuizData>({
    title: "",
    categoryId: 1,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchQuizzes();
    fetchCategories();
  }, []);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const data = await quizService.getAll();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      categoryId: 1,
    });
    setEditMode(false);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = async (quizId: number) => {
    try {
      const quiz = await quizService.getById(quizId);
      setFormData({
        id: quiz.id,
        title: quiz.title,
        categoryId: quiz.category.id,
      });
      setEditMode(true);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
  };

  const openDeleteDialog = (quizId: number) => {
    setQuizToDelete(quizId);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateOrUpdateQuiz = async () => {
    if (!formData.title || !formData.categoryId) return;

    setIsSubmitting(true);
    try {
      if (editMode && formData.id) {
        await quizService.update(formData.id, formData);
      } else {
        await quizService.create(formData);
      }
      setIsDialogOpen(false);
      resetForm();
      await fetchQuizzes();
    } catch (error) {
      console.error("Error saving quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;

    setIsSubmitting(true);
    try {
      await quizService.delete(quizToDelete);
      setIsDeleteDialogOpen(false);
      setQuizToDelete(null);
      await fetchQuizzes();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: parseInt(value) }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quizzes</CardTitle>
          <Button onClick={openCreateDialog}>Add New Quiz</Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : quizzes.length === 0 ? (
          <EmptyState message="No quizzes available" />
        ) : (
          <QuizTable
            quizzes={quizzes}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Quiz" : "Create New Quiz"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update quiz details"
                : "Enter details for your new quiz"}
            </DialogDescription>
          </DialogHeader>
          <QuizForm
            formData={formData}
            categories={categories}
            handleInputChange={handleInputChange}
            handleCategoryChange={handleCategoryChange}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrUpdateQuiz}
              disabled={isSubmitting || !formData.title || !formData.categoryId}
            >
              {isSubmitting
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : editMode
                  ? "Update Quiz"
                  : "Create Quiz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this quiz and all associated
              questions and scores. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuiz}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ManageQuizzes;
