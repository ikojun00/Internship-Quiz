import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectProps {
  id: string;
  register: any;
  registerOptions?: any;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  id,
  register,
  registerOptions = {},
  error,
  value,
  onChange,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) onChange(newValue);

    if (register) {
      const event = {
        target: {
          name: id,
          value: newValue,
        },
      };

      register(id, registerOptions).onChange(event);
    }
  };

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">User</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RoleSelect;
