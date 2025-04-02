import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthCard from "@/components/auth/AuthCard";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PaswordInput";

type FormData = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.username, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const footer = (
    <AuthFooter
      prompt="Don't have an account?"
      linkText="Sign Up"
      onLinkClick={() => navigate("/signup")}
    />
  );

  return (
    <AuthLayout>
      <AuthCard title="Sign In" footer={footer}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            id="username"
            label="Username"
            placeholder="Enter your username"
            register={register}
            registerOptions={{ required: "Username is required." }}
            error={errors.username?.message}
          />

          <FormField
            id="password"
            label="Password"
            error={errors.password?.message}
            register={register}
            registerOptions={{ required: "Password is required." }}
          >
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              register={register}
              registerOptions={{ required: "Password is required." }}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignIn;
