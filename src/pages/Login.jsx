
import React, { useContext, useState } from "react";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendLogin } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/schemaLogin";
import { AuthContext } from "../Context/AuthContext";
import login from "../assets/undraw_projections_fhch.svg";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  async function signIn(userData) {
    setLoading(true);
    const response = await sendLogin(userData);

    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token);
      localStorage.setItem("userName", userData.email);
      toast.success("Login Successful!");
      navigate("/");
    } else {
      setApiError(response.error);
      toast.error(response.error || "Login Failed");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 py-8">
      {/* Card Container */}
      <div className="bg-gradient-to-r from-pink-300/80 to-sky-300/80 w-full max-w-4xl rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-sky-900 mb-4 drop-shadow-sm">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-4">
            <Input
              isInvalid={Boolean(errors.email && touchedFields.email)}
              errorMessage={errors.email?.message}
               placeholder="Enter Your Email" 
              variant="bordered"
              {...register("email")}
              type="email"
              className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <Input
              isInvalid={Boolean(errors.password && touchedFields.password)}
              errorMessage={errors.password?.message}
              placeholder="Enter Your Password" 
              variant="bordered"
              {...register("password")}
              type="password"
              className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <Button
              isLoading={loading}
              type="submit"
              className="mt-4 bg-gradient-to-r from-pink-600 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Login
            </Button>

            <div className="text-center text-gray-700 mt-2">
              Don't have an account?{" "}
              <Link className="text-pink-600 font-bold hover:underline" to="/register">
                Sign Up
              </Link>
            </div>

            {apiError && (
              <span className="text-center text-red-700 mt-2">{apiError}</span>
            )}
          </form>
        </div>

        
        <div className="flex-1 flex justify-center">
          <img
            src={login}
            alt="Login Illustration"
            className="w-72 md:w-96 rounded-2xl shadow-lg transform hover:scale-105 transition"
          />
        </div>

      </div>
    </div>
  );
}
