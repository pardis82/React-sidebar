import clsx from "clsx";
import { useState, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
}

export default function TextInput({
  label,
  errorMessage,
  containerClassName,
  className,
  value,
  ...props
}: Props) {
  const hasValue = !!value && String(value).length > 0;
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowPlaceholder = hasValue || isFocused;

  const BaseContainerclass =
    " text-xs pt-6 pb-2 px-3 block w-full bg-transparent focus:outline-none focus:ring-2 border border-gray-300 focus:ring-purple-500 rounded-lg  peer ";
  const ErrorContainer = "border-red-400 focus:ring-red-500";
  const NormalLabelClass =
    "text-sm font-medium text-gray-700 whitespace-nowrap pointer-events-none absolute transition-all duration-400 transform -translate-y-1/2 scale-100 top-1/2 right-3";
  const FloatingLabelClass =
    "peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-gray-500 peer-focus:bg-inherit peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent";
  return (
    <>
      <div className={clsx(containerClassName)}>
        <div className="relative bg-white rounded-lg">
          <input
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            placeholder={shouldShowPlaceholder ? props.placeholder : " "}
            id={props.id}
            className={clsx(
              BaseContainerclass,
              errorMessage && ErrorContainer,
              !shouldShowPlaceholder && "placeholder-transparent ",
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className={clsx(
                NormalLabelClass,
                shouldShowPlaceholder
                  ? clsx(
                      "scale-90 -translate-y-5 top-2 font-normal bg-inherit px-3",
                      errorMessage ? "text-red-500" : "text-purple-500 "
                    )
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500 font-normal"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </>
  );
}
