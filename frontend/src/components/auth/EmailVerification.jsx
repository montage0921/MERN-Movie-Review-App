import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";

const OTP_LENGTH = 6;

let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  //update OTP array
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));

  //update highlighted otp grid
  const [activeOtp, setActiveOtp] = useState(0);

  const inputRef = useRef();

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const { state } = useLocation();
  const user = state?.user;

  function focusNextInputField(currentOTPIndex) {
    setActiveOtp(currentOTPIndex + 1);
  }

  function focusPreInputField(currentOTPIndex) {
    setActiveOtp(currentOTPIndex - 1);
  }

  function handleOnChange(e) {
    const value = e.target.value;

    //only keep the last digit of user's input number
    const digit = value.substring(value.length - 1, value.length);

    const copyOtp = [...otp];

    copyOtp[currentOTPIndex] = digit;

    //go back to last OTP grid if user deletes current one
    if (!value) {
      focusPreInputField(currentOTPIndex);
    } else {
      focusNextInputField(currentOTPIndex);
    }
    setOtp(copyOtp);
  }

  //handle key board operations
  function handleKeyDown(e, index) {
    currentOTPIndex = index;
    const key = e.key;

    if (key === "Backspace") focusPreInputField(currentOTPIndex);
    if (key === "ArrowLeft") focusPreInputField(currentOTPIndex);
    if (key === "ArrowRight") focusNextInputField(currentOTPIndex);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) updateNotification("error", "Invalid OTP");

    //submit otp
    const userInfo = { OTP: otp.join(""), userId: user.id };
    const response = await verifyUserEmail(userInfo);

    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtp]);

  useEffect(() => {
    if (!user) navigate("/not-found");
  }, [user]);

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-mzy-blue rounded p-6 space-y-6  "
        >
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4 ">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  value={otp[index]}
                  ref={activeOtp === index ? inputRef : null}
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 rounded border-dark-subtle outline-none focus:border-white bg-transparent text-center text-xl text-white font-semibold"
                  type="number"
                />
              );
            })}
          </div>

          <Submit value={"Verify"}></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}
