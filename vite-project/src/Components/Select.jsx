import React from "react";
import { useFormContext } from "react-hook-form";

export default function Select({
  id,
  className,
  label,
  options,
  changeHandler,
}) {
  const { register } = useFormContext();
  return (
    <div className={className}>
      <label>{label}</label>
      <select
        {...register(id, {
          required: { value: true, message: "required" },
        })}
        onChange={changeHandler}
      >
        {options.map((element, index) => {
          return (
            <option key={index} value={element}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
}