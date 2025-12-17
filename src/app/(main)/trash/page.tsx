import Image from 'next/image';

import TrashIcon from '../../../../public/delete-icon-common.svg';

import RemovedBoard from '../../../components/RemovedBoard';

import BoardTypes from '../../../types/Board';

import Cookies from 'js-cookie';

async function getDeletedTasks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Error al traer los tableros');
      return [];
    }
  } catch (error) {
    console.error('Error del servidor al traer los tableros: ', error);
    return [];
  }
}

export default async function Trash() {

  var boards: BoardTypes[] = await getDeletedTasks();

  return (
    <div className="p-3 md:p-10">
      <div className='flex items-center bg-task-gray-background w-fit px-3 py-2 md:px-6 mb-4 md:mb-6 rounded-[5px]'>
        <Image src={TrashIcon} alt="Trash Icon" width={40} height={40} className='invert' />
        <h1 className="ml-2 text-md md:text-base font-poppins">Tableros Eliminados</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center'>
        {boards.map((board) => {
          if (board.removed === true) {
            return (
              <RemovedBoard key={board.boardid} boardid={board.boardid} title={board.title} tasks={board.tasks} />
            )
          }
        })}
      </div>
    </div>
  )
}