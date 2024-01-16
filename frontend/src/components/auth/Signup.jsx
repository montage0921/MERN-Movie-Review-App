import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    //a common way to update object type state
    //this syntax create a shallow copy firstly
    //then dymanically change a specific field in the object
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            name={"name"}
            placeholder={"John Doe"}
            label={"Name"}
            type="input"
            value={name}
            onChange={handleOnChange}
          ></FormInput>
          <FormInput
            name={"email"}
            placeholder={"john@email.com"}
            label={"Email"}
            type="input"
            value={email}
            onChange={handleOnChange}
          ></FormInput>
          <FormInput
            name={"password"}
            placeholder={"*******"}
            label={"Password"}
            type="password"
            value={password}
            onChange={handleOnChange}
          ></FormInput>

          <Submit value={"Sign up"}></Submit>

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
