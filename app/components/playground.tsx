import React from "react";
import SignOutButton from "./buttons/SignOutButton";
import { FaPlus } from "react-icons/fa";

export default function Playground() {
    return (
        <div className="h-screen bg-white flex flex-col justify-center items-center">
            <div className="flex flex-row">
                <span className="text-3xl font-extrabold p-2">
                    To-do playground
                </span>
                <SignOutButton />
            </div>
            <button className="border-y border-[#a7a7a7] p-3 my-4 flex flex-row  w-[80%]">
                <FaPlus className="mx-2" />
                <span className="text-[#a7a7a7]"> Add new task</span>
            </button>
        </div>
    );
}
