import { z } from "zod";
import { SigninSchema, SignupSchema } from "../lib/schema";

export interface User {
  _id: string;
  name: string;
  email: string;
}

export type LoginFormData = z.infer<typeof SigninSchema>;

export type SignupFormData = z.infer<typeof SignupSchema>;
