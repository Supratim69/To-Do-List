"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function SignInButton() {
    return (
        <button
            onClick={() => {
                signIn("github");
            }}
        >
            Login using GitHub
        </button>
    );
}
