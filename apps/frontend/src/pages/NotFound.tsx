import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-secondary-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary-foreground mb-6">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </div>
  );
};

export default NotFound;
