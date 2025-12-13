"use client"

import FormInput from "../../components/ui/FormInput";

import { useState } from "react";

export default function NewBoard({ state, setState }: NewBoardFormTypes) {
  const [title, setTitle] = useState("");

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      })

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Error al crear el tablero");
      }
    } catch (error) {
      console.error("Error al crear el tablero: ", error);
    }
  }

  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <h1 className="font-poppins mb-6 text-xl">Crea tu Nuevo Tablero</h1>
              <form onSubmit={handleCreate}>
                <FormInput type="text" title="Titulo del Tablero" placeholder="Ej: Desarrollo de Pagina Web" inputValue={title} setText={setTitle} />
                <div className="flex justify-center gap-6">
                  <button type="submit" className="w-[30%] py-2 font-m-plus-1p font-bold bg-main text-white rounded-[5px] hover:translate-y-[-3px] hover:opacity-80 transition-all duration-100 cursor-pointer">Crear</button>
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