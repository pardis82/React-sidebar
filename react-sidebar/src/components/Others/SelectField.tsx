import { useId, Fragment, useState } from "react";
import { clsx } from "clsx";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

interface OptionProps {
  value: string | number;
  label: string;
}

type SingleSelectProps = {
  multiple?: false;
  value?: OptionProps;
  onChange?: (value: OptionProps) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value?: OptionProps[];
  onChange?: (value: OptionProps[]) => void;
};

type SelectProps = {
  options: OptionProps[];
  label?: string;
  erroMessage?: string;
  className?: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select(props: SelectProps) {
  const { label, options, multiple, erroMessage, className } = props;
  const generatedId = useId();
  const [isFocused, setIsFocused] = useState(false);

  // Handle display text for both single and multiple modes
  const getButtonText = () => {
    if (multiple) {
      const selectedValues = props.value || [];
      if (selectedValues.length === 0) return "Please select items";
      if (selectedValues.length === 1) return selectedValues[0].label;
      return `${selectedValues.length} items selected`;
    }
    return props.value?.label || "Please select an item";
  };

  // Check if an option is selected (works for both single and multiple)
  const isOptionSelected = (option: OptionProps) => {
    if (multiple) {
      return props.value?.some((item) => item.value === option.value) || false;
    }
    return props.value?.value === option.value;
  };

  return (
    <Listbox
      value={props.value}
      onChange={props.onChange as any}
      multiple={multiple}
    >
      <div className="flex flex-col gap-1">
        {/* Select container with always-floated label */}
        <div className="relative bg-white rounded-lg">
          <ListboxButton
            id={generatedId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={clsx(
              "relative w-full cursor-default rounded-lg bg-white pt-5 pb-2 pl-10 pr-3 text-right border focus:outline-none focus:ring-1 text-sm",
              erroMessage
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            )}
          >
            <span className="block truncate text-gray-900">
              {getButtonText()}
            </span>

            {/* Chevron Down Icon */}
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronDown
                className={clsx(
                  "h-5 w-5 transition-transform duration-200",
                  isFocused ? "text-purple-500" : "text-gray-400"
                )}
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          {/* Label - ALWAYS at top with floated styling */}
          {label && (
            <label
              htmlFor={generatedId}
              className={clsx(
                "absolute pointer-events-none transition-all duration-300 transform scale-90 -translate-y-5 top-2 font-normal bg-white px-1 right-3 text-sm",
                isFocused
                  ? erroMessage
                    ? "text-red-500"
                    : "text-purple-500"
                  : erroMessage
                  ? "text-red-500"
                  : "text-gray-500"
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* Dropdown Options */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute mt-12 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        isOptionSelected(option) ? "font-medium" : "font-normal"
                      )}
                    >
                      {option.label}
                    </span>

                    {/* Check Icon for selected items */}
                    {isOptionSelected(option) && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>

        {/* Error Message */}
        {erroMessage && (
          <p className="text-red-500 text-sm mt-1">{erroMessage}</p>
        )}
      </div>
    </Listbox>
  );
}
