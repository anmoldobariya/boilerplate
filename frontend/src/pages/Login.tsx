import { useForm } from "react-hook-form";
import { LoginFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "../lib/schema";
import { AUTH_TOKEN, SignInFields } from "../lib/constants";
import { FormInput } from "../components/ui/FormInput";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/auth";
import { handleError, handleSuccess } from "../lib/utils";
import { actions } from "../redux/store";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(SigninSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    const { data: res, error } = await login(data);
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
      <div className="w-full sm:max-w-[500px] p-4 sm:p-8 sm:py-10 sm:shadow-md rounded-lg space-y-6">
        <div className="text-center text-3xl font-bold  text-gray-900">
          Login
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {SignInFields.map(({ name, ...rest }) => (
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
            Login
          </Button>

          <Link to="/signup" className="text-[14px] text-blue-500 underline">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
