"use client";
import { Todo } from "@prisma/client";
import React, {
    Dispatch,
    SetStateAction,
    useState,
    useTransition,
} from "react";
import { FaPenSquare, FaTrash } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
    title: string;
    id: string;
    setList: Dispatch<SetStateAction<Todo[]>>;
}

export default function Task(props: Props) {
    const [isChecked, setIsChecked] = useState(false);
    const [pending, startTransition] = useTransition();
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const deleteTask = (id: string) => {
        startTransition(async () => {
            const response = await fetch(`http://localhost:3000/api/todos`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.status === 200) {
                props.setList((prevList: Todo[]) =>
                    prevList.filter((item) => item.id !== id)
                );
                setIsChecked(false);
            }
        });
    };

    const editTask = (id: string, title: string) => {
        startTransition(async () => {
            const response = await fetch(`http://localhost:3000/api/todos`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, title }),
            });

            if (response.status === 200) {
                setIsDialogOpen(false);
                props.setList((prevList: Todo[]) =>
                    prevList.map((item) =>
                        item.id === id ? { ...item, title: title } : item
                    )
                );
            }
        });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setTimeout(() => deleteTask(props.id), 1000);
        }
    };

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editTask(props.id, updatedTitle);
    };

    return (
        <div
            className={`flex flex-row justify-between items-center border-b border-[#a7a7a7] m-1 w-[80%] ${
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
                    {props.title}
                </span>
            </div>
            <div className="flex flex-row items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <button
                            className={`hover:bg-gray-200 py-2 rounded-lg m-1 ${
                                isChecked ? "cursor-not-allowed" : ""
                            }`}
                            disabled={isChecked}
                            title="Edit Task"
                        >
                            <FaPenSquare className="mx-1" />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter new task title</DialogTitle>
                            <form onSubmit={handleUpdateSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Add New Title"
                                    className="border-b border-black py-2 outline-none w-full"
                                    value={updatedTitle}
                                    onChange={(e) => {
                                        setUpdatedTitle(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="p-2 hover:bg-gray-300 my-1 rounded-lg w-fit border"
                                >
                                    Update
                                </button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <button
                    className={`hover:bg-gray-200 py-2 rounded-lg m-1 ${
                        isChecked ? "cursor-not-allowed" : ""
                    }`}
                    title="Delete Task"
                    disabled={isChecked}
                    onClick={() => deleteTask(props.id)}
                >
                    <FaTrash className="mx-1" />
                </button>
            </div>
        </div>
    );
}
