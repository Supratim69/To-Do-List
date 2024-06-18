import { signOut } from "@/app/auth";
import React from "react";
import { FaSignInAlt } from "react-icons/fa";

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button className="flex items-center hover:bg-gray-200 py-2 rounded-lg">
                <FaSignInAlt className="mx-2" />
            </button>
        </form>
    );
}
