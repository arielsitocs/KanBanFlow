"use client"

import { useState } from "react";

import Image from "next/image"
import TasksIcon from "../../../public/checklist-icon.svg";
import PlusIcon from "../../../public/create-icon-simple.svg";

import NewBoardForm from "../../components/forms/NewBoard";

export default function DashboardHeader() {
  const [newBoardFormState, setNewBoardFormState] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex justify-center items-center bg-task-gray-background px-3 py-2 md:px-6 mb-4 md:mb-0 rounded-[5px]">
          <Image src={TasksIcon} width={40} height={40} alt="Task Icon" className="shrink-0 md:w-[40px] md:h-[40px] w-[30px] h-[30px] " />
          <h1 className="ml-2 text-md md:text-base font-poppins">Mis Tableros</h1>
        </div>
        <div className="flex bg-main justify-center items-center px-3 py-2 md:px-9 rounded-[5px] hover:opacity-80 transition-all duration-100 cursor-pointer" onClick={() => setNewBoardFormState(true)}>
          <Image src={PlusIcon} width={32} height={32} alt="Plus Icon" className="md:w-[32px] md:h-[32px] w-[24px] h-[24px]" />
          <h1 className="text-white ml-2 font-poppins text-md md:text-base">Nuevo Tablero</h1>
        </div>
      </div>
      <NewBoardForm state={newBoardFormState} setState={setNewBoardFormState} />
    </>
  )
}