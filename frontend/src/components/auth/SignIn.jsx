import React from "react";
import Container from "../Container";

export default function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-72">
          <h1 className="textxl text-white font-semibold text-center">
            Sign In
          </h1>
          <div className="flex flex-col-reverse">
            <input
              id="email"
              type="text"
              className="bg-transparent rounded border-2 border-dark-subtle 
              w-full text-lg outline-none focus:p-1 text-white peer "
              placeholder='"john@email.com'
            />
            <label
              className="text-white font-semibold peer-focus:font-bold transition self-start"
              htmlFor="email"
            >
              Email
            </label>

            <label htmlFor=""></label>
          </div>
        </form>
      </Container>
    </div>
  );
}
