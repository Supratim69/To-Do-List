import { signIn } from "@/app/auth";
import React from "react";

export default function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button>Login using GitHub</button>
        </form>
    );
}
