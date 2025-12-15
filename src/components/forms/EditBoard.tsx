"use client"

import BoardTypes from "@/src/types/Board";
import FormInput from "../ui/FormInput";
import Loader from "../ui/Loader";

import { useState } from "react";

import { useRouter } from 'next/navigation';

import { toast } from "sonner";

export default function EditBoard({ boardid, title, state, setState = () => { } }: BoardTypes) {
  const [oldTitle, setOldTitle] = useState(title);
  const [loaderState, setLoaderState] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    {
      try {
        setLoaderState(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/update/${boardid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: oldTitle })
        });

        if (response.ok) {
          toast.success('Tablero actualizado exitosamente');
          setState(false);
          router.refresh();
        } else {
          toast.error('Error al actualizar el tablero');
        }

      } catch (error) {
        console.error('Error al actualizar el tablero: ', error);
        toast.error('Error al actualizar el tablero');
      } finally {
        setLoaderState(false);
      }
    }
  }

  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <h1 className="font-poppins mb-6 text-xl">Haz cambios en tu Tablero</h1>
              <form onSubmit={handleUpdate}>
                <FormInput type="text" title="Nuevo titulo del Tablero" inputValue={oldTitle} setText={setOldTitle} />
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