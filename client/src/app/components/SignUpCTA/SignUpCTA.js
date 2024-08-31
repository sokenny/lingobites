"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
// import styles from "./SignUpCTA.module.css";

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
