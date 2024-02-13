import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";

const validateUserInfo = (userInfo) => {
  const { name, email, password } = userInfo;

  //regular expression for validating email
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //check if name is missing
  if (!name) return { ok: false, error: `Name is missing!` };

  //check if email is missing
  if (!email.trim()) return { ok: false, error: `Email is missing` };
  //check if email is valid
  if (!isValidEmail.test(email)) return { ok: false, error: `Invalid email` };

  //check if password is missing
  if (!password.trim()) return { ok: false, error: `Password is missing` };
  //password need to >=8
  if (password.length < 8)
    return { ok: false, error: `Password must be at least 8 characters` };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  //return a method for changing the location
  const navigate = useNavigate();

  //
  const { updateNotification } = useNotification();

  const handleOnChange = (e) => {
    //value input
    const value = e.target.value;

    //name of the current input field
    const name = e.target.name;

    //a common way to update object type state
    //this syntax create a shallow copy firstly
    //then dymanically change a specific field in the object
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    //use axios function to submit userInfo to backend
    const response = await createUser(userInfo);

    if (response.error) return console.log(response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      relpace: true,
    });
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
