import React from "react";

export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle focus:border-white text-lg outline-none p-1 text-white peer transition "
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="text-white font-semibold peer-focus:font-bold transition self-start"
        htmlFor={name}
      >
        {label}
      </label>

      <label htmlFor=""></label>
    </div>
  );
}
