import React from "react";
import Navbar from "./components/user/Navbar";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";

export default function App() {
  return (
    <>
      <Navbar />
      <Signup />
    </>
  );
}
