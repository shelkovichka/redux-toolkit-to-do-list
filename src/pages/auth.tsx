import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/hooks/use-auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { selectAuthLoading } from "@/redux/selectors/auth-selectors";
import logo from "@/assets/img.png";

interface AuthFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Invalid e-mail")
    .required("Email is required")
    .trim(),
  password: yup.string().required("Password is required").trim(),
});

const Auth: React.FC = () => {
  const { signUp, login } = useAuth();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: AuthFormData) => {
    isRegistering
      ? await signUp(email, password)
      : await login(email, password);
    navigate("/");
    reset();
  };

  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="hidden md:flex flex-1">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <Card className="p-6 w-96 m-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <h2 className="text-lg font-semibold">
              {isRegistering ? "Sign Up" : "Log In"}
            </h2>

            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
            {errors.email && (
              <p className="absolute top-9 left-3.5 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input {...field} type="password" placeholder="Password" />
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {isRegistering ? "Sign Up" : "Log In"}
            </Button>

            <p
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-blue-500 cursor-pointer"
            >
              {isRegistering
                ? "Have account? Log In"
                : "Don't have account? Sign Up"}
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
