import { signOut } from "@/app/auth";
import React from "react";

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button>Logout</button>
        </form>
    );
}
