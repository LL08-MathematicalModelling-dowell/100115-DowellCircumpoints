import React from "react";
import { useFormContext } from "react-hook-form";
import HelpIcon from "./help/components/helpIcon";

export default function Input({
  id,
  className,
  label = null,
  helpType,
  placeholder,
  type,
  required,
}) {
  const { register } = useFormContext();

  return (
    <div className={className}>
      <div className="input-label-holder">
        <label>{label}</label>
        {label && <HelpIcon helpType={helpType} />}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...(required
          ? register(id, {
              required: { value: true, message: "required" },
            })
          : {})}
      />
    </div>
  );
}
