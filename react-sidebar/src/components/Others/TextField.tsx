import clsx from "clsx";
import { useState, type InputHTMLAttributes, useId } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
  minrows?: number;
  multiline?: boolean;
  maxrows?: number;
  defaultValue?: string;
}

export default function TextField({
  label,
  errorMessage,
  className,
  containerClassName,
  value,
  defaultValue,
  minrows,
  maxrows,
  multiline = false,
  id, // Extract id from props
  name, // Extract name from props
  ...props
}: Props) {
  // Generate a unique ID if none provided
  const generatedId = useId();
  const inputId = id || generatedId;

  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);

  const actualValue = value !== undefined ? value : internalValue;
  const hasValue = !!actualValue && String(actualValue).length > 0;

  const shouldFloatLabel = hasValue || isFocused;
  const shouldShowPlaceholder = isFocused && !hasValue;

  const BaseContainerclass =
    "border border-gray-300 text-gray-700 text-base rounded-lg block w-full pt-3 pb-3 px-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-purple-500 peer placeholder:delay-90 placeholder:text-sm";
  const ErrorContainer = "border-red-400 focus:ring-red-500";
  const NormalLabelClass =
    "text-sm font-medium text-gray-500 whitespace-nowrap pointer-events-none absolute transition-all duration-300 transform origin-left right-3";

  const InputType = multiline ? "textarea" : "input";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={clsx(containerClassName)}>
      <div className="relative bg-white rounded-lg">
        <InputType
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={handleChange}
          value={actualValue}
          placeholder={shouldShowPlaceholder ? props.placeholder : " "}
          id={inputId} // Use the guaranteed ID
          name={name || inputId} // Use name prop or fallback to ID
          className={clsx(
            BaseContainerclass,
            errorMessage && ErrorContainer,
            !shouldShowPlaceholder && "placeholder-transparent",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId} // Associate label with the input
            className={clsx(
              NormalLabelClass,
              shouldFloatLabel
                ? clsx(
                    "scale-90 -translate-y-5 top-2 font-normal bg-white px-1",
                    multiline &&
                      "top-2 -translate-y-5 scale-90 font-normal bg-white px-1",
                    errorMessage ? "text-red-500" : "text-purple-500"
                  )
                : clsx(
                    "scale-100 -translate-y-1/2 top-1/2 text-gray-500 text-xs font-normal"
                  )
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
  );
}
