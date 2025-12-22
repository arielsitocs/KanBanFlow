import TableProps from "../../../../../types/TableProps";
import BoardTypes from "../../../../../types/Board";

import TaskCard from "@/src/components/TaskCard";
import TaskCardView from "../../../../../components/TaskCardView";

import Image from "next/image";

export const dynamic = 'force-dynamic';

import TaskIcon from "../../../../../../public/task-icon.svg";

// funcion que trae los tableros desde la api //
async function getBoards() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/getall`, { cache: 'no-store' });

        if (!response.ok) return [];

        return await response.json();
    } catch (error) {
        console.error("Error al traer los tableros: ", error);
        return [];
    }
}

// funcion que trae las tareas desde la api //
async function getTasks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/getall`, { cache: 'no-store' });

        if (!response.ok) return [];

        return await response.json();
    } catch (error) {
        console.error("Error al traer las tareas: ", error);
        return [];
    }
}

export default async function Table({ params }: TableProps) {
    const { id } = await params;
    const boards = await getBoards();
    const tasks = await getTasks();
    const board = boards.find((board: BoardTypes) => board.boardid === parseInt(id));

    if (!board) {
        return (
            <div className="p-6 w-full h-screen bg-main-gray-background font-poppins flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">Tablero de ID {id} no encontrado</h1>
            </div>
        )
    }

    return (
        <div className="p-6 w-full h-screen bg-main-gray-background font-poppins">
            <div className="flex items-center justify-center w-[fit-content] px-3 bg-white py-1  rounded-[5px]">
                <Image src={TaskIcon} width={36} height={36} alt="task-icon" />
                <h1 className="ml-1 text-lg">{board.title}</h1>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 h-[90%] justify-center mt-6 gap-2 lg:gap-4 ">
                <TaskCard board={board} state="pending" tasks={tasks} />
                <TaskCard board={board} state="in progress" tasks={tasks} />
                <TaskCard board={board} state="completed" tasks={tasks} />
            </div>
        </div>
    )
}