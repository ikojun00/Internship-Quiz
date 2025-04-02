import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ShowPassword from "@/assets/show-password.svg?react";
import HidePassword from "@/assets/hide-password.svg?react";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  register: any;
  registerOptions?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  register,
  registerOptions = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register(id, registerOptions)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 w-6 h-6 p-1 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? (
          <ShowPassword className="w-full h-full" />
        ) : (
          <HidePassword className="w-full h-full" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
