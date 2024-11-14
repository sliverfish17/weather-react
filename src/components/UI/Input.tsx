import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({
  label,
  id,
  onChange,
  value,
  type = 'text',
  placeholder,
  className,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} className="text-sm leading-[14px] mb-3">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-[15px] text-[14px] leading-[14px] rounded-lg border border-gray-50 bg-gray-0 ${className}`}
      />
    </>
  );
};
