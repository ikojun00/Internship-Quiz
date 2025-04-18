import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { scoreService } from "@/services/api/base";
import LoadingSpinner from "../LoadingSpinner";

interface UserRankProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserRankData {
  rank: number;
  totalScore: number;
  totalPlayers: number;
}

const UserRank: React.FC<UserRankProps> = ({ isOpen, onClose }) => {
  const [rankData, setRankData] = useState<UserRankData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchRank = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await scoreService.getUserRanking();
          setRankData(data);
        } catch (error) {
          console.error("Error fetching user rank:", error);
          setError("Could not load your ranking. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchRank();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Ranking</DialogTitle>
          <DialogDescription>
            Here's how you stack up against other players.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : rankData ? (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm">Rank</p>
                <p className="text-2xl font-bold">#{rankData.rank}</p>
              </div>
              <div>
                <p className="text-sm">Total Score</p>
                <p className="text-2xl font-bold">{rankData.totalScore}</p>
              </div>
              <div>
                <p className="text-sm">Total Players</p>
                <p className="text-2xl font-bold">{rankData.totalPlayers}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">No ranking data available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRank;
