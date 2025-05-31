import { forwardRef } from "react";

interface iInputValues extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value?: string;
}

export const Input = forwardRef<HTMLInputElement, iInputValues>(
  ({ type, label, id, placeholder, value, ...rest }, ref) => {
    return (
      <fieldset className="bg-white rounded-xl py-4 px-2 flex flex-col gap-2 w-full transition-all duration-300 ring-0 focus-within:ring-indigo-200">
        <label
          htmlFor={id}
          className="text-brand-200 font-semibold text-sm tracking-wide uppercase pb-2 transition-colors duration-200"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          defaultValue={value}
          {...rest}
          className="border-b border-l rounded-sm border-gray-400 focus-within:border-brand-100 px-2 bg-transparent w-full h-10 text-gray-700 text-md placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-0 transition-colors duration-200"
        />
      </fieldset>
    );
  }
);

Input.displayName = "Input";
