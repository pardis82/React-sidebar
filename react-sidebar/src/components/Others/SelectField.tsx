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

export interface OptionProps {
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
  showSelectAll?: boolean;
  selectAllText?: string; // Custom text for "Select All"
  deselectAllText?: string; // Custom text for "Deselect All"
} & (SingleSelectProps | MultipleSelectProps);

export default function Select(props: SelectProps) {
  const {
    label,
    options,
    multiple,
    erroMessage,
    className,
    showSelectAll = false,
    selectAllText = "Select All", // Default text
    deselectAllText = "Deselect All", // Default text
  } = props;
  const generatedId = useId();
  const [isFocused, setIsFocused] = useState(false);

  // Handle display text for both single and multiple modes
  const getButtonText = () => {
    if (multiple) {
      const selectedValues = (props.value as OptionProps[]) || [];
      if (selectedValues.length === 0) return "انتخاب کنید";
      if (selectedValues.length === 1) return selectedValues[0].label;
      return `${selectedValues.length} آیتم انتخاب شد`;
    }
    const selectedValue = props.value as OptionProps | undefined;
    return selectedValue?.label || "انتخاب کنید";
  };

  // Check if all options are selected
  const areAllSelected = () => {
    if (!multiple) return false;
    const selectedValues = (props.value as OptionProps[]) || [];
    return selectedValues.length === options.length;
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!multiple) return;

    if (areAllSelected()) {
      (props.onChange as (value: OptionProps[]) => void)?.([]);
    } else {
      (props.onChange as (value: OptionProps[]) => void)?.(options);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-44">
      <div className="relative bg-white rounded-lg">
        <Listbox
          value={props.value}
          onChange={props.onChange as any}
          multiple={multiple}
          by="value"
        >
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

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
              {/* Select All Option with Custom Text */}
              {multiple && showSelectAll && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className={clsx(
                    "relative cursor-default select-none py-2 pl-10 pr-4 border-b border-gray-200 w-full text-right",
                    "hover:bg-purple-100 hover:text-purple-900 text-gray-900"
                  )}
                >
                  <span
                    className={clsx(
                      "block truncate font-medium",
                      areAllSelected() ? "text-purple-600" : "text-gray-900"
                    )}
                  >
                    {areAllSelected() ? deselectAllText : selectAllText}
                  </span>
                  {areAllSelected() && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </button>
              )}

              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ active, selected }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active
                        ? "bg-purple-100 text-purple-900"
                        : "text-gray-900",
                      selected && "bg-purple-50"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {option.label}
                      </span>
                      {selected && (
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
        </Listbox>

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

      {erroMessage && (
        <p className="text-red-500 text-sm mt-1">{erroMessage}</p>
      )}
    </div>
  );
}
