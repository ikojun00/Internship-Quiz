import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import AuthCard from "@/components/auth/AuthCard";
import RoleSelect from "@/components/auth/RoleSelect";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PaswordInput";

type FormData = {
  username: string;
  password: string;
  role: "USER" | "ADMIN";
};

const SignUp: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.username, data.password, data.role);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const passwordRegisterOptions = {
    required: "Password is required.",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters.",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: "Password must include uppercase, lowercase, and a number.",
    },
  };

  const footer = (
    <AuthFooter
      prompt="Already have an account?"
      linkText="Sign In"
      onLinkClick={() => navigate("/signin")}
    />
  );

  return (
    <AuthLayout>
      <AuthCard title="Sign Up" footer={footer}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            id="username"
            label="Username"
            placeholder="Choose a username"
            register={register}
            registerOptions={{ required: "Username is required." }}
            error={errors.username?.message}
          />

          <FormField
            id="password"
            label="Password"
            error={errors.password?.message}
            register={register}
            registerOptions={passwordRegisterOptions}
          >
            <PasswordInput
              id="password"
              placeholder="Choose a password"
              register={register}
              registerOptions={passwordRegisterOptions}
            />
          </FormField>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <RoleSelect
              id="role"
              register={register}
              registerOptions={{ required: "Role is required." }}
              error={errors.role?.message}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignUp;
