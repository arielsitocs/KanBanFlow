import FormInput from "../../components/ui/FormInput";

export default function NewTask({ state, setState, boardName }: NewTaskFormTypes) {
  return (
    <>
      {
        state ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            <div className="bg-gray-solid-background p-6 w-[90%] md:w-[65%] lg:w-[45%] xl:w-[30%] rounded-[10px]">
              <h1 className="font-poppins mb-6 text-xl">Crea una Tarea para {boardName}</h1>
              <form action="submit">
                <FormInput type="text" title="Titulo de la Tarea" placeholder="Ej: Solucionar bugs del FrontEnd" />
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