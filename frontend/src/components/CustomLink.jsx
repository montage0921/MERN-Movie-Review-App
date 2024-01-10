import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return (
    <Link
      className="text-white text-sm hover:text-dark-subtle transition"
      to={to}
    >
      {children}
    </Link>
  );
}
