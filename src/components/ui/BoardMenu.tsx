"use client"

import Image from "next/image"

import EditIcon from "../../../public/edit-icon.svg";
import DeleteIcon from "../../../public/cross-delete-icon.svg";

import BoardTypes from "../../types/Board";
import EditBoard from "../forms/EditBoard";
import Alert from "./Alert";
import Loader from "./Loader";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function BoardMenu({ boardid, title, state }: BoardTypes) {
  const [editBoardState, setEditBoardState] = useState(false);
  const [deleteBoardState, setDeleteBoardState] = useState(false);

  const router = useRouter();

  async function handleDeleteBoard() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/deleteone/${boardid}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Tablero eliminado exitosamente')
        router.refresh();
      } else {
        toast.error('Error al eliminar el tablero')
      }
    } catch (error) {
      console.error('Error al eliminar el tablero: ', error);
    }
  }

  return (
    <>
      {
        state ? (
          <div className="flex flex-col w-fit h-fit px-6 py-2 bg-gray-background-menu border-[2px] border-border-light-gray rounded-[5px] items-center gap-4">
            <div className="flex items-center hover:cursor-pointer hover:opacity-50 transition-all">
              <Image src={EditIcon} width={24} height={24} alt="Edit Icon" />
              <h1 className="ml-2 font-poppins text-main" onClick={() => setEditBoardState(true)}>Editar</h1>
            </div>
            <div className="flex items-center hover:cursor-pointer hover:opacity-50 transition-all">
              <Image src={DeleteIcon} width={24} height={24} alt="Delete Icon" />
              <h1 className="ml-2 font-poppins text-red" onClick={() => setDeleteBoardState(true)}>Eliminar</h1>
            </div>
          </div>
        ) : null
      }
      <EditBoard boardid={boardid} title={title} state={editBoardState} setState={setEditBoardState} />
      <Alert message="Estás seguro de querer borrar este tablero?" type="confirm" status={deleteBoardState} setStatus={setDeleteBoardState} action={() => handleDeleteBoard()} prop={`El tablero "${title}" será borrado permanentemente junto con todas sus tareas.`} />
    </>
  )
}