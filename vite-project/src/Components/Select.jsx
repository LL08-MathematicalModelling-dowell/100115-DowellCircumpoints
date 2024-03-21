import React from "react";
import { useFormContext } from "react-hook-form";
import HelpIcon from "./help/components/helpIcon";

export default function Select({
  id,
  className,
  label,
  helpType,
  options,
  changeHandler,
}) {
  const { register } = useFormContext();
  return (
    <div className={className}>
      <div className="input-label-holder">
        <label>{label}</label>
        <HelpIcon helpType={helpType} />
      </div>
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
