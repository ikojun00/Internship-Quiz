import React from "react";

interface RoleSelectProps {
  id: string;
  register: any;
  registerOptions?: any;
  error?: string;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  id,
  register,
  registerOptions = {},
  error,
}) => {
  return (
    <>
      <select
        id={id}
        {...register(id, registerOptions)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default RoleSelect;