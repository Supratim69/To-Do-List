"use client";
import React, { useEffect, useState, useTransition } from "react";
import SignOutButton from "./buttons/SignOutButton";
import { FaPlus, FaCheck } from "react-icons/fa";
import Task from "./task";
import { Todo } from "@prisma/client";
import Fuse from "fuse.js";

export default function Playground() {
    const [title, setTitle] = useState("");
    const [pending, startTransition] = useTransition();
    const [list, setList] = useState<Todo[]>([]);

    const handleSearch = (event: any) => {
        const { value } = event.target;
        if (value.length === 0) {
            setList(list);
            return;
        }

        const fuse = new Fuse(list, {
            keys: ["title"],
        });

        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        console.log(items);
        setList(items);
    };

    const fetchTodos = () => {
        startTransition(async () => {
            const response = await fetch("http://localhost:3000/api/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setList(await response.json());
        });
    };

    const newTodo = () => {
        startTransition(async () => {
            const response = await fetch("http://localhost:3000/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
            });
            console.log(response.status);
            // if (response.status === 201) {
            //     const task = await response.json();
            //     console.log(task);
            //     console.log(list);
            //     setList((prev) => {
            //         console.log([...prev, task]);
            //         return [...prev, task];
            //     });
            // } else {
            //     alert("Error in saving!");
            // }
            // setTitle("");
        });
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="h-screen bg-white flex flex-col justify-start items-center pt-6">
            <div className="flex flex-row items-center">
                <span className="lg:text-3xl text-xl font-extrabold p-2">
                    To-do playground
                </span>
                <SignOutButton />
            </div>
            <input
                type="text"
                placeholder="Search task"
                onChange={handleSearch}
                className="p-2 my-4 lg:w-[20%] w-[50%] border rounded-3xl border-[#a7a7a7]"
            />
            <div className="border-y border-[#a7a7a7] p-3 my-4 flex flex-row items-center w-[80%] justify-between">
                <form
                    className="flex flex-row items-center w-full"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FaPlus className="mx-2" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Add New Task"
                        className=" p-2 outline-none w-full"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </form>
                <button
                    className="hover:bg-gray-200 py-2 rounded-lg"
                    onClick={newTodo}
                    title="Add new to-do"
                >
                    <FaCheck className="mx-2 " />
                </button>
            </div>
            {pending && <span>Loading...</span>}
            <div className="w-full flex flex-col mb-4 items-center overflow-y-auto">
                {list.map((item, index) => (
                    <Task
                        setList={setList}
                        id={item.id}
                        title={item.title}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
