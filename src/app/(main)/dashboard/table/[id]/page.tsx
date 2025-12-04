import TableProps from "../../../../../types/TableProps";
import BoardTypes from "../../../../../types/Board";
import { boards } from "../../../../../data/boards.json";

import TaskCard from "../../../../../components/TaskCard";

import Image from "next/image";

import TaskIcon from "../../../../../../public/task-icon.svg";

export default async function Table({ params }: TableProps) {
    const { id } = await params;
    const board = boards.find((board) => board.id === id) as BoardTypes;

    return (
        <div className="p-6 w-full h-screen bg-main-gray-background font-poppins">
            <div className="flex items-center justify-center w-[fit-content] px-3 bg-white py-1  rounded-[5px]">
                <Image src={TaskIcon} width={36} height={36} alt="task-icon" />
                <h1 className="ml-1 text-lg">{board.title}</h1>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 h-[90%] justify-center mt-6 gap-2 lg:gap-4 ">
                <TaskCard board={board} state="pending" />
                <TaskCard board={board} state="in progress" />
                <TaskCard board={board} state="completed" />
            </div>
        </div>
    )
}