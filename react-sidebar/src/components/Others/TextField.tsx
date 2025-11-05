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
  id,
  name,
  ...props
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isFocused, setIsFocused] = useState(false);

  const actualValue = value !== undefined ? value : internalValue;
  const hasValue = !!actualValue && String(actualValue).length > 0;

  const shouldFloatLabel = hasValue || isFocused;
  const shouldShowPlaceholder = isFocused && !hasValue;

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
    <div className={clsx("relative", containerClassName)}>
      {/* Fieldset with conditional notch */}
      <fieldset
        className={clsx(
          "relative border rounded-lg px-3 transition-colors  duration-300",
          // Dynamic padding based on float state
          shouldFloatLabel ? "pt-4 pb-2" : "py-3",
          errorMessage
            ? "border-red-400 focus-within:border-red-500"
            : "border-gray-300 focus-within:border-purple-500"
        )}
      >
        {/* Legend - Only creates notch when floated */}
        {label && shouldFloatLabel && (
          <legend className="px-1 text-xs h-0 overflow-hidden">
            {/* Invisible text to create notch space */}
            <span className="opacity-0">{label}</span>
          </legend>
        )}

        <InputType
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={handleChange}
          value={actualValue}
          placeholder={shouldShowPlaceholder ? props.placeholder : " "}
          id={inputId}
          name={name ?? inputId}
          className={clsx(
            "peer w-full bg-transparent outline-none text-base placeholder-transparent",
            errorMessage && "text-red-600",
            className
          )}
          {...props}
        />

        {/* Floating label */}
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              "absolute right-3 text-gray-500 transition-all duration-300 pointer-events-none px-1",
              shouldFloatLabel
                ? "-top-2 text-xs text-purple-500"
                : "top-1/2 -translate-y-1/2 text-sm",
              errorMessage ? "text-red-500" : "text-purple-500"
            )}
          >
            {label}
          </label>
        )}
      </fieldset>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
