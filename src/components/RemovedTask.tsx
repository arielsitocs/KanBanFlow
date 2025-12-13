"use client"

import { useState } from 'react';

import Alert from '../components/ui/Alert';

export default function RemovedTask({ id, name, taskNumber }: RemovedTaskProps) {
  const [alertStatus, setAlertStatus] = useState(false);

  return (
    <div className="flex flex-col w-full justify-center items-center bg-gray-background border-[2px] border-border-light-gray rounded-[5px] font-poppins gap-6 p-4">
      <h1 className="font-bold mr-4 text-lg" >{name}</h1>
      <h1 className="">{taskNumber} tareas</h1>
      <div className="flex justify-center gap-5 text-white w-full">
        <button className="bg-main p-2 rounded-[5px] w-[30%] hover:translate-y-[-4px] cursor-pointer transition-all duration-200 hover:opacity-80 text-sm">Restaurar</button>
        <button onClick={() => setAlertStatus(true)} className="bg-red p-2 rounded-[5px] w-[30%] hover:translate-y-[-4px] cursor-pointer transition-all duration-200 hover:opacity-80 text-sm">Eliminar</button>
      </div>
      <Alert message="Eliminaras este tablero definitivamente!" type="confirm" prop={`Eliminaras el tablero "${name}", esta accion no se puede deshacer`} status={alertStatus} setStatus={setAlertStatus} action={() => { }} />
    </div>
  )
}