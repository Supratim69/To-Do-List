import React from "react";
import Playground from "./components/playground";
import SignInButton from "./components/buttons/SignInButton";
import { auth } from "./auth";

export default async function Home() {
    const session = await auth();

    return (
        <>
            {!session ? (
                <div className="h-screen bg-white flex flex-col justify-center items-center">
                    <span className="text-3xl font-semibold">Welcome</span>
                    <SignInButton />
                </div>
            ) : (
                <Playground />
            )}
        </>
    );
}
