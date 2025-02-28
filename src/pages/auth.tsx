import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/hooks/use-auth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const { handleSubmit, control, reset } = useForm<AuthFormData>({
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
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="p-6 w-96">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <h2 className="text-lg font-semibold">
            {isRegistering ? "Регистрация" : "Вход"}
          </h2>

          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" placeholder="Password" />
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {isRegistering ? "Зарегистрироваться" : "Войти"}
          </Button>

          <p
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-blue-500 cursor-pointer"
          >
            {isRegistering
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Регистрация"}
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
