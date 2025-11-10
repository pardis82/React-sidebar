import clsx from "clsx";
import {
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  useId,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
  minrows?: number;
  multiline?: boolean;
  maxrows?: number;
  defaultValue?: string;
  helperText?: string;
}

export default function TextField({
  label,
  helperText,
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
  placeholder,
  ...props
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (!textAreaRef.current) return;

    const ta = textAreaRef.current;

    ta.style.height = "auto";

    const lineHeight = parseInt(getComputedStyle(ta).lineHeight);
    const maxHeight = (maxrows ?? 10) * lineHeight;
    const minHeight = (minrows ?? 3) * lineHeight;

    const newHeight = Math.min(Math.max(ta.scrollHeight, minHeight), maxHeight);

    ta.style.height = newHeight + "px";
  };

  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isFocused, setIsFocused] = useState(false);

  const actualValue = value !== undefined ? value : internalValue;
  const hasValue = !!actualValue && String(actualValue).length > 0;

  const float = hasValue || isFocused;

  const InputType = multiline ? "textarea" : "input";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value === undefined) setInternalValue(e.target.value);
    props.onChange?.(e);
  };

  useEffect(() => {
    if (multiline) adjustHeight();
  }, [actualValue, isFocused]);

  return (
    <div
      className={clsx("w-full", containerClassName)}
      style={
        {
          ["--input-bg" as any]: "#ffb866",
          display: "inline-block",
        } as React.CSSProperties
      }
    >
      {/* Outer wrapper */}
      <div
        className={clsx(
          "relative rounded-lg px-3 py-3",
          "bg-[color:var(--input-bg)]"
        )}
      >
        {/* Fieldset with proper notch implementation */}
        <fieldset
          aria-hidden
          className={clsx(
            "absolute inset-0 pointer-events-none rounded-lg border transition-colors",
            errorMessage
              ? "border-red-400"
              : isFocused
              ? "border-purple-500"
              : "border-gray-300"
          )}
        >
          {/* Legend for the notch */}
          {label && float && (
            <legend
              className={clsx(
                "h-0 overflow-hidden transition-all duration-150 px-1",
                float ? "max-w-full" : "max-w-0"
              )}
            >
              {/* Invisible text for layout - this creates the notch */}
              <span className="text-xs opacity-0 px-1">{label}</span>
            </legend>
          )}
        </fieldset>

        {/* Input / Textarea */}
        <InputType
          ref={multiline ? textAreaRef : undefined}
          id={inputId}
          name={name ?? inputId}
          value={actualValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={multiline ? minrows ?? 3 : undefined}
          className={clsx(
            "w-full bg-transparent outline-none text-[14.5px] leading-normal font-[YekanBakh] text-right ",

            errorMessage && "text-red-600",
            className
          )}
          placeholder={
            float && placeholder
              ? placeholder.length > 20
                ? placeholder.substring(0, 20) + "..."
                : placeholder
              : ""
          }
          {...(props as any)}
        />

        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              "absolute transition-all duration-150 px-1 font-[YekanBakh] pointer-events-none",
              "right-2",
              float
                ? clsx(
                    "text-[15px]",
                    errorMessage
                      ? "-top-[0.7rem] text-red-500"
                      : "-top-[0.6rem] text-purple-600"
                  )
                : "top-1/2 -translate-y-1/2 text-sm text-gray-600"
            )}
            style={{ background: "transparent" }}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error message */}
      {errorMessage ? (
        <p className="text-red-500 font-[YekanBakh] text-sm mt-1">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-gray-500 font-[YekanBakh] text-sm mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
