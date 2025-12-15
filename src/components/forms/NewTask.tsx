"use client"

import FormInput from "../../components/ui/FormInput";
import Loader from "../../components/ui/Loader";

import NewTaskFormTypes from "../../types/NewTaskForm";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function NewTask({ state, setState, board }: NewTaskFormTypes) {
  const [title, setTitle] = useState('');
  const [limitDate, setLimitDate] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [taskState, setTaskState] = useState('pending');
  const [loaderState, setLoaderState] = useState(false);

  const router = useRouter();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoaderState(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskname: title,
          limitdate: limitDate,
          priority: priority,
          status: taskState,
          boardid: board.boardid,
          userid: 1
        })
      })

      if (response.ok) {
        router.refresh();
        setState(false);
        toast.success('Tarea creada exitosamente');
      } else if (response.status === 500) {
        toast.error('Error al crear la tarea - ERROR 500 DEL SERVIDOR');
      } else {
        toast.error('Error al crear la tarea - ERROR DESCONOCIDO DEL CLIENTE');
      }
    } catch (error) {
      console.error('Error al crear la tarea: ', error)
    } finally {
      setLoaderState(false);
    }
  }

  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <h1 className="font-poppins mb-6 text-xl">Crea una Tarea para "{board.title}"</h1>
              <form onSubmit={handleCreate}>
                <FormInput type="text" title="Nombre de la Tarea" placeholder="Ej: Hacer la cama de Chincheto" inputValue={title} setText={setTitle} />
                <FormInput type="date" title="Fecha de vencimiento" inputValue={limitDate} setDate={setLimitDate} />
                <div>
                  <h1 className="form-input-title">Prioridad</h1>
                  <select
                    className="form-input"
                    onChange={(e) => setPriority(e.target.value as any)}
                    value={priority}
                    required
                  >
                    <option value="Baja" selected>Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                  <h1 className="form-input-title">Estado Inicial</h1>
                  <select
                    className="form-input"
                    onChange={(e) => setTaskState(e.target.value as any)}
                    value={taskState}
                    required
                  >
                    <option value="pending" selected>Tarea Pendiente</option>
                    <option value="in progress">Tarea en Progreso</option>
                    <option value="completed">Tarea Completada</option>
                  </select>
                </div>
                <div className="flex justify-center gap-6">
                  <button type="submit" className="w-[30%] py-2 font-m-plus-1p font-bold bg-main text-white rounded-[5px] hover:translate-y-[-3px] hover:opacity-80 transition-all duration-100 cursor-pointer">Guardar</button>
                  <button className="w-[30%] font-m-plus-1p font-bold text-main rounded-[5px] border-2 border-main hover:translate-y-[-3px] transition-all duration-100 cursor-pointer" onClick={() => setState(false)}>Cancelar</button>
                </div>
              </form>
            </div>
            <Loader state={loaderState} setState={setLoaderState} />
          </div>
        ) : null
      }
    </>
  )
}