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
  containerClassName?: string;
  showSelectAll?: boolean;
  selectAllText?: string;
  deselectAllText?: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select(props: SelectProps) {
  const {
    label,
    options,
    multiple,
    erroMessage,
    className,
    containerClassName,
    showSelectAll = false,
    selectAllText = "Select All",
    deselectAllText = "Deselect All",
  } = props;

  const generatedId = useId();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false); //  NEW

  // Display text logic (single OR multiple)
  const getButtonText = () => {
    if (multiple) {
      const selectedValues = props.value as OptionProps[];
      if (selectedValues.length === 0) return "انتخاب کنید";
      if (selectedValues.length === 1) return selectedValues[0].label;
      return `${selectedValues.length} آیتم انتخاب شد`;
    }
    const selectedValue = props.value as OptionProps | undefined;
    return selectedValue?.label ?? "انتخاب شد";
  };

  const areAllSelected = () => {
    if (!multiple) return false;
    const selectedValues = props.value as OptionProps[];
    return selectedValues.length === options.length;
  };

  const handleSelectAll = () => {
    if (!multiple) return;
    if (areAllSelected()) {
      (props.onChange as (v: OptionProps[]) => void)?.([]);
    } else {
      (props.onChange as (v: OptionProps[]) => void)?.(options);
    }
  };

  return (
    <div className={clsx("w-full", containerClassName)}>
      <div
        className="relative rounded-lg"
        style={
          {
            ["--input-bg" as any]: "#ffb866",
          } as React.CSSProperties
        }
      >
        <div
          className={clsx(
            "relative rounded-lg px-3 pt-1",
            "bg-[color:var(--input-bg)]"
          )}
        >
          {/* ✅ MUI-style border + notch */}
          <fieldset
            aria-hidden
            className={clsx(
              "absolute inset-0 pointer-events-none rounded-lg transition-colors",
              erroMessage
                ? "border border-red-400"
                : isFocused || isOpen // ✅ keep purple when open
                ? "border border-purple-600"
                : "border border-gray-300"
            )}
          >
            <legend className="px-1 h-0 overflow-hidden transition-all duration-150 w-auto">
              {label && (
                <span className="text-xs rtl:text-right px-1 opacity-0">
                  {label}
                </span>
              )}
            </legend>
          </fieldset>
          {/* ✅ Permanent label */}
          {label && (
            <label
              htmlFor={generatedId}
              className={clsx(
                "absolute px-1 right-2 -top-2 text-xs transition-colors",
                erroMessage
                  ? "text-red-500"
                  : isFocused || isOpen // ✅ keep purple when open
                  ? "text-purple-600"
                  : "text-gray-600"
              )}
            >
              {label}
            </label>
          )}

          {/* ✅ SELECT */}
          <Listbox
            value={props.value}
            onChange={props.onChange as any}
            multiple={multiple}
            by="value"
          >
            {({ open }) => {
              // ✅ Sync headless UI open state with our local state
              if (open !== isOpen) setIsOpen(open);

              return (
                <>
                  <ListboxButton
                    id={generatedId}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={clsx(
                      "relative w-full cursor-default bg-transparent py-3 pl-10 pr-3 text-right focus:outline-none text-sm",
                      className
                    )}
                  >
                    <span className="block truncate text-gray-900">
                      {getButtonText()}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <ChevronDown
                        className={clsx(
                          "h-5 w-5 transition-transform duration-200",
                          isFocused && isOpen
                            ? "text-purple-500"
                            : "text-gray-400"
                        )}
                      />
                    </span>
                  </ListboxButton>

                  {/* ✅ DROPDOWN */}
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-10 mt-3 w-full right-0 overflow-auto rounded-md  py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {/* ✅ Select All */}
                      {multiple && showSelectAll && (
                        <button
                          type="button"
                          onClick={handleSelectAll}
                          className={clsx(
                            "relative cursor-default select-none py-2 px-2 border-b border-gray-200 w-full text-right",
                            "hover:text-purple-900 text-gray-900"
                          )}
                        >
                          <span
                            className={clsx(
                              "block truncate font-medium",
                              areAllSelected()
                                ? "text-purple-600"
                                : "text-gray-900"
                            )}
                          >
                            {areAllSelected() ? deselectAllText : selectAllText}
                          </span>
                          {areAllSelected() && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-purple-600">
                              <Check className="h-5 w-5" />
                            </span>
                          )}
                        </button>
                      )}
                      {/* ✅ Regular options */}
                      {options.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option}
                          className={({ focus, selected }) =>
                            clsx(
                              "relative cursor-default select-none py-2 px-2",
                              focus ? "text-purple-900" : "text-gray-900",
                              selected && "text-purple-600"
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
                                <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-purple-600">
                                  <Check className="h-5 w-5" />
                                </span>
                              )}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </>
              );
            }}
          </Listbox>
        </div>
      </div>

      {erroMessage && (
        <p className="text-red-500 text-sm mt-1">{erroMessage}</p>
      )}
    </div>
  );
}
