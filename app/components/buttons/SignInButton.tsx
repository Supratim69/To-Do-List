import { signIn } from "@/app/auth";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button className="bg-[#161b22] my-4 text-white p-4 text-xl rounded-xl flex flex-row items-center">
                <FaGithub className="mx-2" />
                Login using GitHub
            </button>
        </form>
    );
}
