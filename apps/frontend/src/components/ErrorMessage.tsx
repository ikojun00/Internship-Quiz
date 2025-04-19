import React from "react";
import { Button } from "@/components/ui/button";

type ErrorMessageProps = {
  message: string;
  onBack: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onBack }) => {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-destructive mb-4">{message}</p>
      <Button onClick={onBack}>Back to Quizzes</Button>
    </div>
  );
};

export default ErrorMessage;
