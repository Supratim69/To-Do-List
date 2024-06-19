import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/auth";
import { error } from "console";

const prisma = new PrismaClient();

//To create a new todo
export async function POST(request: Request) {
    const session = await auth();

    try {
        const data = await request.json();
        console.log(data);
        const { title, completed } = data;
        console.log(session?.user?.id!);
        const newTodo = await prisma.todo.create({
            data: {
                title,
                completed: completed || false,
                userId: session?.user?.id!,
            },
        });

        return NextResponse.json(newTodo);
    } catch (error) {
        console.error("Error creating Todo: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

//To Get all the todos
export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorised" },
                { status: 401 }
            );
        }
        const todos = await prisma.todo.findMany({
            where: {
                userId: session?.user?.id!,
            },
        });
        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching Todos: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

//To edit a todo
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        console.log(data);
        const { title, completed } = data;
        const body = await request.json();

        if (!body || !body.id) {
            return NextResponse.json(
                { error: "Missing ID in request body" },
                { status: 400 }
            );
        }

        const { id } = body;
        const updatedTodo = await prisma.todo.update({
            where: {
                id,
            },
            data: {
                title,
                completed,
            },
        });
        return NextResponse.json(updatedTodo);
    } catch (error) {
        console.error("Error updating Todo: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

//To delete a todo
export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        if (!body || !body.id) {
            return NextResponse.json(
                { error: "Missing ID in request body" },
                { status: 400 }
            );
        }

        const { id } = body;

        const deletedTodo = await prisma.todo.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(deletedTodo);
    } catch (error) {
        console.error("Error deleting Todo: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
