import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizService, questionService } from "@/services/api/api";
import { Question, Quiz } from "@/types";

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
import QuizSelector from "../quiz/QuizSelector";
import LoadingSpinner from "../../LoadingSpinner";
import EmptyState from "../../EmptyState";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

const ManageQuestions: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [questionToChange, setQuestionToChange] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Question>({
    id: 1,
    text: "",
    type: "ABC",
    options: "",
    correctAnswer: "",
    points: 1,
    quizId: 1,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      loadQuestions();
    }
  }, [selectedQuiz]);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const data = await quizService.getAll();
      setQuizzes(data);
      if (data.length > 0) {
        setSelectedQuiz(data[0]);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadQuestions = async () => {
    if (!selectedQuiz || !selectedQuiz.id) return;

    setIsLoading(true);
    try {
      const quizDetail = await quizService.getById(selectedQuiz.id);
      setQuestions(quizDetail.questions || []);
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 1,
      text: "",
      type: "ABC",
      options: "",
      correctAnswer: "",
      points: 1,
      quizId: selectedQuiz?.id || 0,
    });
    setEditMode(false);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsFormDialogOpen(true);
  };

  const openEditDialog = async (questionId: number) => {
    try {
      const question = await questionService.getById(questionId);
      setFormData({
        id: question.id,
        text: question.text,
        type: question.type,
        options: question.options,
        correctAnswer: question.correctAnswer,
        points: question.points,
        quizId: selectedQuiz?.id || 0,
      });
      setQuestionToChange(questionId);
      setEditMode(true);
      setIsFormDialogOpen(true);
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
  };

  const openDeleteDialog = (questionId: number) => {
    setQuestionToChange(questionId);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateOrUpdateQuestion = async () => {
    setIsSubmitting(true);
    try {
      questionToChange
        ? await questionService.update(questionToChange, formData)
        : await questionService.create(formData);
      setIsFormDialogOpen(false);
      setQuestionToChange(null);
      resetForm();
      await loadQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!questionToChange) return;

    setIsSubmitting(true);
    try {
      await questionService.delete(questionToChange);
      setIsDeleteDialogOpen(false);
      setQuestionToChange(null);
      await loadQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Questions</CardTitle>
          <div className="flex gap-2">
            <QuizSelector
              quizzes={quizzes}
              selectedQuiz={selectedQuiz}
              onChange={setSelectedQuiz}
            />
            <Button onClick={openCreateDialog} disabled={!selectedQuiz}>
              Add New Question
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : !selectedQuiz ? (
          <EmptyState message="Please select a quiz" />
        ) : questions.length === 0 ? (
          <EmptyState message="No questions available for this quiz" />
        ) : (
          <QuestionList
            questions={questions}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        )}
      </CardContent>

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Question" : "Create New Question"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update question details"
                : "Enter details for your new question"}
            </DialogDescription>
          </DialogHeader>
          <QuestionForm
            formData={formData}
            onChange={handleFormChange}
            quizzes={quizzes}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFormDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrUpdateQuestion}
              disabled={
                isSubmitting ||
                !formData.text ||
                (formData.type !== "FILL_IN" && !formData.options) ||
                !formData.correctAnswer ||
                formData.points < 1
              }
            >
              {isSubmitting
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : editMode
                ? "Update Question"
                : "Create Question"}
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
              This will permanently delete this question. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuestion}
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

export default ManageQuestions;
