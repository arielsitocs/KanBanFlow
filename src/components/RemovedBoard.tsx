"use client"

import { useState } from 'react';

import { toast } from 'sonner';

import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import BoardTypes from '../types/Board';

export default function RemovedTask({ boardid, title, tasks }: BoardTypes) {
  const [alertStatus, setAlertStatus] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);

  const router = useRouter();

  const handleDeleteBoard = async () => {
    try {
      setLoaderStatus(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/deleteone/${boardid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      if (response.ok) {
        toast.success('Tablero eliminado');
        setLoaderStatus(false);
        router.refresh();
      } else {
        toast.error('Error al eliminar el tablero');
        setLoaderStatus(false);
      }
    } catch (error) {
      toast.error('Error del servidor al eliminar el tablero');
      setLoaderStatus(false);
    }
  }

  const handleRestoreBoard = async () => {
    try {
      setLoaderStatus(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/update/${boardid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
          removed: false
        })
      });
      if (response.ok) {
        toast.success('Tablero restaurado');
        setLoaderStatus(false);
        router.refresh();
      } else {
        toast.error('Error al restaurar el tablero');
        setLoaderStatus(false);
      }
    } catch (error) {
      toast.error('Error del servidor al restaurar el tablero');
      setLoaderStatus(false);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center bg-gray-background border-[2px] border-border-light-gray rounded-[5px] font-poppins gap-6 p-4">
      <h1 className="font-bold mr-4 text-lg" >{title}</h1>
      <h1 className="">{tasks?.length || 0} tareas</h1>
      <div className="flex justify-center gap-5 text-white w-full">
        <button onClick={handleRestoreBoard} className="bg-main p-2 rounded-[5px] w-[30%] hover:translate-y-[-4px] cursor-pointer transition-all duration-200 hover:opacity-80 text-sm">Restaurar</button>
        <button onClick={() => setAlertStatus(true)} className="bg-red p-2 rounded-[5px] w-[30%] hover:translate-y-[-4px] cursor-pointer transition-all duration-200 hover:opacity-80 text-sm">Eliminar</button>
      </div>
      <Alert message="Eliminaras este tablero definitivamente!" type="confirm" prop={`Eliminaras el tablero "${title}" junto con todas sus tareas, esta accion no se puede deshacer`} status={alertStatus} setStatus={setAlertStatus} action={handleDeleteBoard} />
      <Loader state={loaderStatus} setState={setLoaderStatus} />
    </div>
  )
}