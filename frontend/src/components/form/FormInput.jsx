import React from "react";

export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle focus:border-white text-base outline-none p-1  peer transition "
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="dark:text-white text-black font-semibold peer-focus:font-bold transition self-start"
        htmlFor={name}
      >
        {label}
      </label>

      <label htmlFor=""></label>
    </div>
  );
}
