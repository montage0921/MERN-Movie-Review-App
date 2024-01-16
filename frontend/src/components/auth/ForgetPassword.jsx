import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-96 space-y-6 ">
          <Title>Please Enter Your Email</Title>
          <FormInput
            name={"email"}
            placeholder={"john@email.com"}
            label={"Email"}
            type="input"
          ></FormInput>

          <Submit value={"Send Verification Email"}></Submit>

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
