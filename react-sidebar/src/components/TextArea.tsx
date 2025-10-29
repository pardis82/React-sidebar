import { type TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  className?: string;
}

export default function TextArea({
  label,
  errorMessage,
  className,
  ...props
}: Props) {
  const baseContainerClass =
    "focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-300 rounded-lg text-xs text-gray-700 w-full block peer px-2 pt-3 pb-3 ";
  const baseErrorContainer = "focus:ring-red-500 border-red-400";
  const baseNormalLabel =
    "absolute text-xs font-medium text-gray-500 transition-all -translate-y-5 top-2 right-3 bg-inherit px-3 peer-focus:text-purple-500 ";
  return (
    <>
      <div className="relative bg-white">
        <textarea
          {...props}
          id={props.id}
          className={clsx(
            baseContainerClass,
            errorMessage && baseErrorContainer
          )}
        ></textarea>
        <label className={clsx(baseNormalLabel)} htmlFor={props.id}>
          {label}
        </label>
        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    </>
  );
}
