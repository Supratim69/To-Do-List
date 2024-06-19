import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { signOutAction } from "@/app/api/actions/SignOut";

export default function SignOutButton() {
    return (
        <form action={signOutAction}>
            <button className="flex items-center hover:bg-gray-200 py-2 rounded-lg">
                <FaSignInAlt className="mx-2" />
            </button>
        </form>
    );
}
