import React, { useEffect, useRef } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    setOTP([...newOtp]);
    setActiveOtpIndex(activeOtpIndex + 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

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
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
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
