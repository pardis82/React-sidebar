import { useId, type HTMLAttributes } from "react";
import { clsx } from "clsx";

interface OptionProps {
  label: string;
  value: string;
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  options: OptionProps[];
  label?: string;
  className?: string;
  errorMessage?: string;
  id?: string;
  name?: string;
}

export default function SelectTextField({
  options,
  label,
  errorMessage,
  className,
  id,
  name,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <>
      <div className="flex flex-col">
        {label && (
          <label className="mb-2 block text-blue-700 text-sm ">{label}</label>
        )}
        <select
          id={inputId}
          name={name || inputId}
          className={clsx(
            className,
            "border border-gray-300 rounded-lg text-sm p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500",
            errorMessage && "border border-red-300 focus:ring-red-500"
          )}
          {...props}
        >
          <option value="" disabled>
            Please choose an item
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
      </div>
    </>
  );
}
