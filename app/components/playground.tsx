import React from "react";
import SignOutButton from "./buttons/SignOutButton";
import { FaPlus, FaCheck } from "react-icons/fa";
import Task from "./task";

export default function Playground() {
    return (
        <div className="h-screen bg-white flex flex-col justify-start items-center pt-6">
            <div className="flex flex-row items-center">
                <span className="text-3xl font-extrabold p-2">
                    To-do playground
                </span>
                <SignOutButton />
            </div>
            <div className="border-y border-[#a7a7a7] p-3 my-4 flex flex-row items-center w-[80%] justify-between">
                <div className="flex flex-row items-center w-full">
                    <FaPlus className="mx-2" />
                    <input
                        type="text"
                        placeholder="Add New Task"
                        className="border-0 p-2 outline-none w-full"
                    />
                </div>
                <button className="hover:bg-gray-200 py-2 rounded-lg">
                    <FaCheck className="mx-2 " />
                </button>
            </div>
            <Task />
        </div>
    );
}
