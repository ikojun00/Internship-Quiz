import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <p className="text-center py-6 text-muted-foreground">{message}</p>;
};

export default EmptyState;