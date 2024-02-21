import React from "react";
import { useFormContext } from "react-hook-form";

export default function Input({
  id,
  className,
  label = "",
  placeholder,
  type,
  required,
}) {
  const { register } = useFormContext();

  return (
    <>
      <div className={className}>
        <div style={{ display: "flex" }}>
          <label>{label}</label>
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required
          {...register(id, {
            required: { value: true, message: "required" },
          })}
        />
      </div>
    </>
  );
}
