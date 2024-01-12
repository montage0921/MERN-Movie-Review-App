import React, { useEffect, useRef } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";

const OTP_LENGTH = 6;

let currentOTPIndex;

export default function EmailVerification() {
  //update OTP array
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  //update highlighted otp grid
  const [activeOtp, setActiveOtp] = useState(0);
  const inputRef = useRef();

  function focusNextInputField(currentOTPIndex) {
    setActiveOtp(currentOTPIndex + 1);
  }

  function focusPreInputField(currentOTPIndex) {
    setActiveOtp(currentOTPIndex - 1);
  }

  function handleOnChange(e) {
    console.log(currentOTPIndex);
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtp]);

  return (
    <div className="fixed  inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-mzy-blue rounded p-6 space-y-6  ">
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
    </div>
  );
}
