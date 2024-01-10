import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOTP] = useState(new Array(OTP_LENGTH).fill(""));

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
            {otp.map((x) => {
              return (
                <input
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
