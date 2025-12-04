"use client"

import TaskTypes from "@/src/types/Task";
import FormInput from "../ui/FormInput";

import { useState, useEffect } from "react";

export default function EditTask({ id, name, limitDate, priority, state, setState = () => { } }: TaskTypes) {
  const [oldName, setOldName] = useState(name);
  const [oldLimitDate, setOldLimitDate] = useState(limitDate);
  const [oldPriority, setOldPriority] = useState(priority);

  // Para actualizar los estados en tiempo real //
  useEffect(() => {
    setOldName(name);
    setOldLimitDate(limitDate);
    setOldPriority(priority);
  }, [name, limitDate, priority]);

  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <h1 className="font-poppins mb-6 text-xl">{name}</h1>
              <form action="submit">
                <FormInput type="text" title="Nombre de la Tarea" inputValue={oldName} setText={setOldName} />
                <FormInput type="date" title="Fecha de vencimiento" inputValue={oldLimitDate} setText={setOldLimitDate} />
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