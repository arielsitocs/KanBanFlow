"use client";

import Image from "next/image"
import BoardTypes from "../types/Board";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState } from "react";
import Link from "next/link";
import 'react-circular-progressbar/dist/styles.css';
import { calculateBoardProgress, countTasksByState } from "../utils/BoardUtils";

import TaskIcon from "../../public/task-icon.svg";
import MenuIcon from "../../public/menu-dots-icon.svg";
import CheckIcon from "../../public/green-check-icon.svg";
import PendingIcon from "../../public/yellow-pending-icon.svg";
import InProgressIcon from "../../public/blue-progress-icon.svg";

import BoardMenu from "../components/ui/BoardMenu";

export default function Board({ boardid, title }: BoardTypes) {
  const [menuState, setMenuState] = useState(false);

  const tasks = countTasksByState(boardid);
  const currentPendingTasks = tasks.pendingTasks;
  const currentInProgressTasks = tasks.inProgressTasks;
  const currentCompletedTasks = tasks.completedTasks;

  const percentage = calculateBoardProgress(currentCompletedTasks, currentPendingTasks, currentInProgressTasks);

  return (
    <div className="relative w-full">
      <div className="absolute top-[-90px] right-0 z-10">
        <BoardMenu boardid={boardid} title={title} state={menuState} />
      </div>

      <div className="font-poppins p-4 min-w-[60%] md:min-w-[100%] bg-gray-background border-[2px] border-border-light-gray rounded-[5px] hover:translate-y-[-5px] hover:border-main hover:cursor-pointer transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image src={TaskIcon} width={40} height={40} alt="Task Icon" />
            <h1 className="ml-2 text-lg">{title}</h1>
          </div>
          <Image src={MenuIcon} width={32} height={32} alt="Menu Icon" className="hover:cursor-pointer hover:opacity-50 transition-all" onClick={() => setMenuState(!menuState)} />
        </div>
        <Link href={`/dashboard/table/${boardid}`}>
          <div className="flex items-center">
            <div>
              <div className="flex items-center mb-1">
                <Image src={CheckIcon} width={36} height={36} alt="Check Icon" className="mr-2" />
                <h1 className="text-green">{currentCompletedTasks} Tareas Completadas</h1>
              </div>
              <div className="flex items-center mb-1">
                <Image src={PendingIcon} width={36} height={36} alt="Pending Icon" className="mr-2" />
                <h1 className="text-orange">{currentPendingTasks} Tareas Pendientes</h1>
              </div>
              <div className="flex items-center mb-1">
                <Image src={InProgressIcon} width={36} height={36} alt="In Progress Icon" className="mr-2" />
                <h1 className="text-light-blue">{currentInProgressTasks} Tareas En Progreso</h1>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center ml-auto mr-6">
              <h1 className="mb-2 font-poppins text-text-gray-2">Progreso</h1>
              <div className="w-[60px]">
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ textColor: "#2AA105", pathColor: "#2AA105", trailColor: "#D9D9D9" })} />
              </div>
            </div>
          </div>
        </Link>
      </div>

    </div >
  )
}