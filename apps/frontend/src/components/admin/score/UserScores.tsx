import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { scoreService } from "@/services/api/api";
import LoadingSpinner from "../../LoadingSpinner";
import EmptyState from "../../EmptyState";
import ScoresTable from "./ScoresTable";

interface Score {
  totalScore: number;
  user: {
    id: number;
    username: string;
  };
}

const UserScores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        const data = await scoreService.getAllScores();
        setScores(data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Scores</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : scores.length === 0 ? (
          <EmptyState message="No scores available" />
        ) : (
          <ScoresTable scores={scores} />
        )}
      </CardContent>
    </Card>
  );
};

export default UserScores;
