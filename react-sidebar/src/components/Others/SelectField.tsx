import { useId, Fragment } from "react";
import { clsx } from "clsx";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
interface OptionProps {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: OptionProps[];
  label?: string;
  erroMessage?: string;
  value?: OptionProps;
  onChange?: (value: OptionProps) => void;
  className?: string;
}

export default function Select({
  options,
  label,
  erroMessage,
  value,
  onChange,
  className,
}: SelectProps) {
  const generatedId = useId();
  return (
    <>
      <Listbox value={value} onChange={onChange}>
        <div className="flex flex-col">
          {label && (
            <Listbox.Label
              htmlFor={generatedId}
              as="label"
              className={clsx("m-3 text-sm text-gray-500", className)}
            >
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <ListboxButton
              id={generatedId}
              className={clsx(
                "relative w-full p-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg text-right "
              )}
            >
              {value?.label || "Please select an item"}
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                className={clsx(
                  " mt-1 focus:outline-none bg-white absolute max-h-60 overflow-auto w-full rounded-md z-10 shadow-lg "
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    value={option}
                    key={option.value}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-default select-none py-2 px-4",
                        active
                          ? "bg-purple-100 text-purple-900"
                          : "text-gray-900"
                      )
                    }
                  >
                    {option.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
          {erroMessage && (
            <p className="text-red-500 text-sm mt-1">{erroMessage}</p>
          )}
        </div>
      </Listbox>
    </>
  );
}
