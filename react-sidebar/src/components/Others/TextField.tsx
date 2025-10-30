import React from "react";
import clsx from "clsx";
import { useState, type InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
  rows?: number;
  multiline?: boolean;
  maxrows?: number;
  defaultvalue?: string;
}

export default function TextField({
  label,
  errorMessage,
  className,
  containerClassName,
  value,
  defaultvalue,
  rows,
  maxrows,
  multiline = false,
  ...props
}: Props) {
  const hasValue = !!value && String(value).length > 0;
  const hasDefaultValue = !!defaultvalue && String(defaultvalue).length > 0;
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowPlaceholder = multiline
    ? true
    : hasDefaultValue || hasValue || isFocused;
  const shouldFloatLabel = multiline
    ? true
    : hasDefaultValue || hasValue || isFocused;

  const BaseContainerclass =
    " border border-gray-300 text-gray-700 text-base rounded-lg block w-full pt-3 pb-3 px-2 bg-transparent focus:outline-none focus:ring-1  focus:ring-purple-500  peer placeholder:delay-90 placeholder:text-sm ";
  const ErrorContainer = "border-red-400 focus:ring-red-500";
  const NormalLabelClass =
    "text-sm font-medium text-gray-500 whitespace-nowrap pointer-events-none absolute transition-all duration-300 transform -translate-y-1/2 scale-100 top-1/2 right-3";
  const MultiLineProps = multiline ? { rows, maxrows } : {};
  const InputType = multiline ? "textarea" : "input";
  return (
    <>
      <div className={clsx(containerClassName)}>
        <div className="relative bg-white rounded-lg">
          {React.createElement(InputType, {
            onBlur: () => setIsFocused(false),
            onFocus: () => setIsFocused(true),
            placeholder: shouldShowPlaceholder ? props.placeholder : " ",
            id: props.id,
            className: clsx(
              BaseContainerclass,
              errorMessage && ErrorContainer,
              !shouldShowPlaceholder &&
                "placeholder-transparent flex items-center justify-center ",
              className
            ),
            ...MultiLineProps,
            ...props,
          })}
          {label && (
            <label
              htmlFor={props.id}
              className={clsx(
                NormalLabelClass,
                shouldFloatLabel
                  ? clsx(
                      "scale-90 -translate-y-5 top-2 font-normal bg-inherit px-3",
                      errorMessage ? "text-red-500" : "text-purple-500 "
                    )
                  : "scale-100 -translate-y-1/2 top-1/2 text-gray-500 text-xs font-normal"
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
