import { useId, Fragment, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
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
  searchable?: boolean;
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
    searchable = false,
  } = props;
  const [query, setQuery] = useState("");
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
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (!isOpen && searchable) {
      setQuery("");
    }
  }, [isOpen, searchable]);
  return (
    <div className={clsx("w-full", containerClassName)}>
      <div
        className="relative rounded-lg"
        style={
          {
            ["--input-bg" as any]: "oklch(92.3% 0.003 48.717)",
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
                "absolute px-1 right-2 -top-2 text-[14.5px] font-sans transition-colors",
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
              if (open !== isOpen) {
                setIsOpen(open);
              }

              return (
                <>
                  <ListboxButton
                    id={generatedId}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={clsx(
                      "relative w-full cursor-default bg-transparent py-3 pl-10 pr-1 text-right focus:outline-none text-sm",
                      className
                    )}
                  >
                    <span className="block truncate text-gray-800 font-sans">
                      {getButtonText()}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center ">
                      <ChevronDown
                        className={clsx(
                          "h-5 w-5 left-0 transition-transform duration-200",
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
                    <ListboxOptions className="absolute z-10 mt-1 w-full right-0 overflow-auto rounded-md  py-1 shadow-lg bg-stone-200 focus:outline-none border border-purple-600">
                      {/* ✅ SEARCH FIELD */}
                      {searchable && (
                        <div className="px-1 pb-1 bg-stone-200 sticky top-0 font-sans ">
                          <div className="relative">
                            <CiSearch className="absolute transform rotate-360 right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                              type="text"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="جستجو..."
                              className="w-full border border-gray-300 rounded-md px-5 py-2 text-sm focus:ring-1/2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      )}

                      {filteredOptions.length === 0 && (
                        <div className="px-3 py-2 text-gray-500 text-sm text-center font-sans">
                          نتیجه‌ای یافت نشد
                        </div>
                      )}
                      {/* ✅ Select All */}
                      {multiple &&
                        showSelectAll &&
                        filteredOptions.length > 0 && (
                          <button
                            type="button"
                            onClick={handleSelectAll}
                            className={clsx(
                              "relative cursor-default select-none py-2 px-3 border-b border-gray-300 w-full text-right font-sans",
                              "hover:text-purple-600 text-gray-900"
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
                              {areAllSelected()
                                ? deselectAllText
                                : selectAllText}
                            </span>
                            {areAllSelected() && (
                              <span className="absolute inset-y-0 left-2 flex items-center pl-1 text-purple-600">
                                <Check className="h-5 w-5" />
                              </span>
                            )}
                          </button>
                        )}

                      {/* ✅ Regular options */}
                      {(filteredOptions.length > 0 ? filteredOptions : []).map(
                        (option) => (
                          <ListboxOption
                            key={option.value}
                            value={option}
                            className={({ focus, selected }) =>
                              clsx(
                                "relative cursor-default select-none py-2 px-3 font-sans",
                                focus ? "text-purple-600 " : "text-gray-900",
                                selected && "text-purple-600 "
                              )
                            }
                          >
                            {({ selected }) => (
                              <div className="flex items-center justify-between">
                                {/* Option label */}
                                <span
                                  className={clsx(
                                    "block truncate ",
                                    selected ? "font-medium" : "font-normal"
                                  )}
                                >
                                  {option.label}
                                </span>
                                {/* Checkbox */}
                                {multiple && (
                                  <div
                                    className={clsx(
                                      "flex items-center justify-center w-5 h-5 border-2 rounded ",
                                      selected
                                        ? "bg-purple-600 border-purple-600"
                                        : "border-gray-300 "
                                    )}
                                  >
                                    {selected && (
                                      <Check className="h-3 w-3 text-white" />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </ListboxOption>
                        )
                      )}
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
