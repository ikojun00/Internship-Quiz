import React from "react";

interface AuthFooterProps {
  prompt: string;
  linkText: string;
  onLinkClick: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  prompt,
  linkText,
  onLinkClick,
}) => {
  return (
    <p className="text-sm text-center text-muted-foreground">
      {prompt}{" "}
      <a
        onClick={onLinkClick}
        className="text-sidebar-primary hover:underline cursor-pointer"
      >
        {linkText}
      </a>
    </p>
  );
};

export default AuthFooter;
