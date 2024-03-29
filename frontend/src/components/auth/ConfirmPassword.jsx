import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import CustomLink from "../CustomLink";
import Submit from "../form/Submit";
import FormContainer from "../form/FormContainer";

export default function ConfirmPassword() {
  return (
    <FormContainer>
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-96 space-y-6 ">
          <Title>Please Confirm Your Email</Title>
          <FormInput
            name={"password"}
            placeholder={"*******"}
            label={"New Password"}
            type="input"
          ></FormInput>
          <FormInput
            name={"confirmPassword"}
            placeholder={"********"}
            label={"Confirm Password"}
            type="input"
          ></FormInput>

          <Submit value={"Confirm Password"}></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}
