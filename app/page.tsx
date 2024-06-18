"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Playground from "./components/playground";
import SignInButton from "./components/buttons/SignInButton";

export default function Home() {
    const { data: session } = useSession();

    return (
        <>
            {!session ? (
                <>
                    <span>Welcome</span>
                    <SignInButton />
                </>
            ) : (
                <Playground />
            )}
        </>
    );
}
