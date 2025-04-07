import { UseFormRegister } from "react-hook-form";
import { cn } from "../../lib/utils";

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "number" | "select" | "password";
  register: UseFormRegister<any>;
  error?: string;
  options?: { value: string; label: string }[];
  valueAsNumber?: boolean;
  className?: string;
  readOnly?: boolean;
}

export const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
  options,
  valueAsNumber,
  readOnly,
  className = ""
}: FormInputProps) => {
  return (
    <div className={className}>
      <label className="block text-md font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === "select" ? (
        <div className="relative">
          <select
            {...register(name)}
            className="block w-full p-2 text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm appearance-none"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          {...register(name, {
            valueAsNumber: type === "number" && valueAsNumber
          })}
          readOnly={readOnly}
          placeholder={placeholder}
          className={cn(
            "block w-full p-2 text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm",
            readOnly && "bg-gray-100"
          )}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
