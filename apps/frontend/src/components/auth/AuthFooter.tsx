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
    <p className="text-sm text-center text-gray-500">
      {prompt}{" "}
      <a
        onClick={onLinkClick}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        {linkText}
      </a>
    </p>
  );
};

export default AuthFooter;
