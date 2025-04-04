import React from "react";

interface Score {
  totalScore: number;
  user: {
    id: number;
    username: string;
  };
}

interface ScoresTableProps {
  scores: Score[];
}

const ScoresTable: React.FC<ScoresTableProps> = ({ scores }) => {
  console.log("ScoresTable scores:", scores);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{score.user.username}</td>
              <td className="py-3 px-4 text-right">{score.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresTable;
