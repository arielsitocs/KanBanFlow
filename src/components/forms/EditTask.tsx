"use client"

import TaskTypes from "@/src/types/Task";
import FormInput from "../ui/FormInput";

import Image from "next/image";
import DeleteIcon from "../../../public/delete-icon-common.svg";

import { useState, useEffect } from "react";

export default function EditTask({ taskid, taskname, limitdate, priority, state, setState = () => { } }: TaskTypes) {
  const [oldName, setOldName] = useState(taskname);
  const [oldLimitDate, setOldLimitDate] = useState(limitdate);
  const [oldPriority, setOldPriority] = useState(priority);

  // Para actualizar los estados en tiempo real //
  useEffect(() => {
    setOldName(taskname);
    setOldLimitDate(limitdate);
    setOldPriority(priority);
  }, [taskname, limitdate, priority]);

  async function handleDelete() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/delete/${taskid}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Tarea no eliminada')
      }
    } catch (error) {
      console.error('Error en el servidor al eliminar la tarea: ', error)
    }
  }

  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-poppins text-xl">{taskname}</h1>
                <Image src={DeleteIcon} alt="delete-icon" width={25} height={25} className="invert hover:cursor-pointer hover:opacity-70 hover:translate-y-[-2px] transition-all duration-100" onClick={handleDelete} />
              </div>
              <form action="submit">
                <FormInput type="text" title="Nombre de la Tarea" inputValue={oldName} setText={setOldName} />
                <FormInput type="date" title="Fecha de vencimiento" inputValue={oldLimitDate} setDate={setOldLimitDate} />
                <div>
                  <h1 className="form-input-title">Prioridad</h1>
                  <select
                    className="form-input"
                    onChange={(e) => setOldPriority(e.target.value as any)}
                    value={oldPriority}
                    required
                  >
                    <option value={oldPriority}>{oldPriority}</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div className="flex justify-center gap-6">
                  <button type="submit" className="w-[30%] py-2 font-m-plus-1p font-bold bg-main text-white rounded-[5px] hover:translate-y-[-3px] hover:opacity-80 transition-all duration-100 cursor-pointer">Guardar</button>
                  <button className="w-[30%] font-m-plus-1p font-bold text-main rounded-[5px] border-2 border-main hover:translate-y-[-3px] transition-all duration-100 cursor-pointer" onClick={() => setState(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        ) : null
      }
    </>
  )
}