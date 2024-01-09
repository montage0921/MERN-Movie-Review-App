import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";

export default function SignIn() {
  return (
    <div className="fixed  inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-72 space-y-6 ">
          <Title>Sign in</Title>
          <FormInput
            name={"email"}
            placeholder={"john@email.com"}
            label={"Email"}
            type="input"
          ></FormInput>
          <FormInput
            name={"password"}
            placeholder={"*******"}
            label={"Password"}
            type="password"
          ></FormInput>

          <Submit value={"Sign In"}></Submit>

          <div className="flex justify-between">
            <a className="text-white hover:text-dark-subtle transition" href="">
              Forget Password
            </a>

            <a
              className="text-white hover:text-dark-subtle transition "
              href=""
            >
              Sign up
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
}
