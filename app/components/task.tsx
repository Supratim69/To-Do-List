"use client";
import React, { useState } from "react";
import { FaPenSquare, FaTrash } from "react-icons/fa";

export default function Task() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div
            className={`flex flex-row justify-between items-center border-b border-[#a7a7a7] w-[80%] ${
                isChecked ? "line-through text-gray-500" : ""
            }`}
        >
            <div className="flex flex-row items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="mx-2 text-lg font-semibold">
                    Get Internship
                </span>
            </div>
            <div className="flex flex-row items-center">
                <button
                    className={`hover:bg-gray-200 py-2 rounded-lg m-1 ${
                        isChecked ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isChecked}
                >
                    <FaPenSquare className="mx-1" />
                </button>
                <button
                    className={`hover:bg-gray-200 py-2 rounded-lg m-1 ${
                        isChecked ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isChecked}
                >
                    <FaTrash className="mx-1" />
                </button>
            </div>
        </div>
    );
}
