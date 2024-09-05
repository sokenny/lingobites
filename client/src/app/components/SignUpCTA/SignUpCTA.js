"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";

const SignUpCTA = ({ children, className }) => {
  return (
    <Button
      onPress={() => {
        signIn("google", {
          callbackUrl: "/onboard",
        });
      }}
      className={className}
      color="primary"
    >
      {children}
    </Button>
  );
};

export default SignUpCTA;
