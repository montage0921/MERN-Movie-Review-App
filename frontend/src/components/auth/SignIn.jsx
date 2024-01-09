import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";

export default function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-72">
          <Title>Sign in</Title>
          <FormInput
            name={"email"}
            placeholder={"john@email.com"}
            label={"Email"}
            type="input"
          ></FormInput>
        </form>
      </Container>
    </div>
  );
}
