import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageQuizzes from "@/components/admin/quiz/ManageQuizzes";
import ManageCategories from "@/components/admin/category/ManageCategories";
import UserScores from "@/components/admin/score/UserScores";
import ManageQuestions from "@/components/admin/question/ManageQuestions";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="quizzes">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">User Scores</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="mt-6">
          <ManageQuizzes />
        </TabsContent>

        <TabsContent value="questions" className="mt-6">
          <ManageQuestions />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <ManageCategories />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserScores />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
