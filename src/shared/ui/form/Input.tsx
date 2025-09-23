import type { InputHTMLAttributes } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

// กำหนด Type ของ props ให้ยืดหยุ่น
type InputProps<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  placeholder?: string;
  control: Control<T>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const Input = <T extends FieldValues>({
  name,
  type = 'text',
  placeholder,
  control,
  inputProps,
}: InputProps<T>) => {
  return (
    <div className="mt-1">
      <div>
        {/* 2. ใช้ Controller หุ้ม Component ที่ต้องการ */}
        <Controller<T>
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                {...inputProps}
                type={type}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  fieldState.error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Input;
