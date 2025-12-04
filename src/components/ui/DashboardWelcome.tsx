import Image from "next/image"

import PlusIcon from "../../../public/create-icon-simple.svg";
import HappyFace from "../../../public/happy-icon.svg";

export default function DashboardWelcome() {
  return (
    <div className="flex justify-center items-center mt-50">
      <div className="flex flex-col text-center items-center bg-main p-12 gap-4 rounded-[5px] text-white">
        <Image src={HappyFace} width={115} height={115} alt="Happy Face" />
        <h1 className="font-poppins font-bold text-3xl">¡Es hora de organizarte!</h1>
        <p className="font-poppins text-lg">Crea tu primer tablero para gestionar tus tareas haciendo click en nuevo tablero...</p>
        <button className="flex bg-transparent-gray-background items-center px-6 py-4 rounded-[5px] hover:opacity-80 transition-all duration-200 cursor-pointer">
          <Image src={PlusIcon} width={32} height={32} alt="Plus Icon" />
          <h1 className="text-white ml-2 font-poppins">Crear mi Primer Tablero</h1>
        </button>
      </div>
    </div>
  )
}