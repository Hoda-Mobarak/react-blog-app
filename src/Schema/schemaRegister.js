
import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,
        "Password must contain uppercase, lowercase, number, special character and be 8-20 chars"
      ),
    rePassword: zod.string().nonempty("RePassword is required"),
    dateOfBirth: zod
      .coerce.date({ required_error: "Date is required" })
      .refine((value) => {
        const today = new Date();
        let age = today.getFullYear() - value.getFullYear();
        const m = today.getMonth() - value.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
          age--; 
        }

        return age >= 18;
      }, { message: "Age must be 18 or older" }),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and RePassword do not match",
  });