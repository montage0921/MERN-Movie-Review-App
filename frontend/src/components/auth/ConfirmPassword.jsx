import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import CustomLink from "../CustomLink";
import Submit from "../form/Submit";

export default function ConfirmPassword() {
  return (
    <div className="fixed  inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-mzy-blue rounded p-6 w-72 space-y-6 ">
          <Title>Password Confirmed</Title>
        </form>
      </Container>
    </div>
  );
}
