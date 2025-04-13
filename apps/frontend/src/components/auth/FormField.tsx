import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  register: any;
  registerOptions?: any;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  error,
  register,
  registerOptions = {},
  children,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children || (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, registerOptions)}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;
