
import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendRegister } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/schemaRegister";
import registeres from "../assets/undraw_upload-image_tpmp.svg";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();

  async function signUp(userData) {
    setLoading(true);
    const response = await sendRegister(userData);

    if (response.message) {
      localStorage.setItem("userName", userData.name);
      toast.success("Registered Successfully!");
      navigate("/login");
    } else {
      setApiError(response.error);
      toast.error(response.error || "Registration Failed");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 ">
      {/* Card Container */}
      <div className="bg-gradient-to-r from-pink-300/80 to-sky-300/80 w-full max-w-4xl rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-sky-900 mb-4 drop-shadow-sm">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">
            <Input
              isInvalid={Boolean(errors.name && touchedFields.name)}
              errorMessage={errors.name?.message}
              placeholder="Enter Your Name"
              variant="bordered"
              {...register("name")}
              type="text"
              className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

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

            <Input
              isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
              errorMessage={errors.rePassword?.message}
              placeholder="Confirm Password"
              variant="bordered"
              {...register("rePassword")}
              type="password"
              className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)}
                errorMessage={errors.dateOfBirth?.message}
                placeholder="Date of Birth"
                variant="bordered"
                {...register("dateOfBirth")}
                type="date"
                className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
              />

              <Select
                isInvalid={Boolean(errors.gender && touchedFields.gender)}
                errorMessage={errors.gender?.message}
                variant="bordered"
                placeholder="Select Your Gender"
                {...register("gender")}
                className="rounded-lg bg-white text-gray-900 placeholder-gray-400"
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            </div>

            <Button
              isLoading={loading}
              type="submit"
              className="mt-4 bg-gradient-to-r from-pink-600 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Register
            </Button>

            <div className="text-center text-gray-700 mt-2">
              Already have an account?{" "}
              <Link className="text-pink-600 font-bold hover:underline" to="/login">
                Sign In
              </Link>
            </div>

            {apiError && (
              <span className="text-center text-red-700 mt-2">{apiError}</span>
            )}
          </form>
        </div>

        
        <div className="flex-1 flex justify-center">
          <img
            src={registeres}
            alt="Register Illustration"
            className="w-72 md:w-96 rounded-2xl shadow-lg transform hover:scale-105 transition"
          />
        </div>

      </div>
    </div>
  );
}

