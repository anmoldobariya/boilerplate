import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData } from "../types";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../lib/schema";
import { AUTH_TOKEN, SignUpFields } from "../lib/constants";
import { FormInput } from "../components/ui/FormInput";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { handleError, handleSuccess } from "../lib/utils";
import { useRegisterMutation } from "../redux/api/auth";
import { actions } from "../redux/store";

export default function Signup() {
  const [registerApi, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    const { data: res, error } = await registerApi(data);
    if (error) {
      handleError(error);
    } else {
      localStorage.setItem(AUTH_TOKEN, res.token);
      actions.auth.setToken(res.token);
      handleSuccess(res);
    }
  };
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="w-full sm:max-w-[500px] p-4 sm:p-8 sm:py-10 sm:shadow-md rounded-lg space-y-8">
        <div className="text-center text-3xl font-bold  text-gray-900">
          Signup
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {SignUpFields.map(({ name, ...rest }) => (
            <FormInput
              key={name}
              name={name}
              register={register}
              error={errors?.[name]?.message}
              {...rest}
            />
          ))}

          <Button
            type="submit"
            className="w-full text-md"
            isLoading={isLoading}
          >
            Signup
          </Button>

          <Link to="/" className="text-[14px] text-blue-500 underline">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
