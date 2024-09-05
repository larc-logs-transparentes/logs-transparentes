import { Transition } from "@headlessui/react";
import { useEffect, useId, useState } from "react";

export type Option = {
  value: string | number;
  label: string | number;
};

type Props = {
  label: string;
  options: Option[];
  value?: string | number;
  placeholder?: string;
  onChange: (...event: unknown[]) => void;
  name: string;
  required?: boolean;
};

export default function Select({
  label,
  options,
  value,
  placeholder,
  name,
  onChange,
  required = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const defaultPlaceholder = placeholder ? placeholder : label;

  const onChangeValue = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  const reset = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEvent = (e: CustomEvent<{ id: string }>) => {
      if (e.detail.id !== id) {
        setIsOpen(false);
      }
    };

    document.addEventListener("select-oppened", handleEvent as EventListener);

    return () =>
      window.removeEventListener(
        "select-oppened",
        handleEvent as EventListener,
      );
  }, [id]);

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(
        new CustomEvent("select-oppened", {
          detail: {
            id,
          },
        }),
      );
    }
  }, [isOpen, id]);

  const displayValue = options.find((item) => item.value === value);

  return (
    <fieldset>
      <label htmlFor={name} className="mb-3 text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative mt-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          className="relative h-9 w-36 cursor-default rounded-md bg-white py-1.5 pl-3 pr-4 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <span className="flex items-center">
            {displayValue ? (
              <span className="block truncate font-medium">
                {displayValue.label}
              </span>
            ) : (
              <span className="block truncate text-sm text-gray-600">
                {defaultPlaceholder}
              </span>
            )}
          </span>

          {required ? (
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                width="9"
                height="6"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2937 1.17165L6.18077 6.02694C5.7906 6.471 5.18922 6.471 4.81518 6.02694L0.702278 1.17165C0.312109 0.711903 0.507193 0.359985 1.10857 0.359985H9.88737C10.5054 0.359985 10.6838 0.712393 10.2937 1.17165Z"
                  fill="black"
                />
              </svg>
            </span>
          ) : (
            <>
              {!value && (
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 11 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2937 1.17165L6.18077 6.02694C5.7906 6.471 5.18922 6.471 4.81518 6.02694L0.702278 1.17165C0.312109 0.711903 0.507193 0.359985 1.10857 0.359985H9.88737C10.5054 0.359985 10.6838 0.712393 10.2937 1.17165Z"
                      fill="black"
                    />
                  </svg>
                </span>
              )}
            </>
          )}
        </button>
        {value && !required && (
          <button
            type="button"
            className="absolute right-2 top-2.5"
            onClick={reset}
          >
            <svg
              width={15}
              height={15}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#666"
            >
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
            </svg>
          </button>
        )}
        <Transition
          show={isOpen}
          enter="transition-all duration-300 origin-top-left"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150 origin-top-left"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ul
            className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => onChangeValue(option.value)}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-50"
                id="listbox-option-0"
                role="option"
              >
                <div className="flex items-center">
                  <span className="block truncate font-medium">
                    {option.label}
                  </span>
                </div>

                {value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </fieldset>
  );
}
