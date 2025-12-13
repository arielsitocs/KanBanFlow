import Image from 'next/image';

import TrashIcon from '../../../../public/delete-icon-common.svg';

import RemovedTask from '../../../components/RemovedTask';

import { deletedTasks } from '../../../data/deletedTasks.json';

export default function Trash() {
  return (
    <div className="p-3 md:p-10">
      <div className='flex items-center bg-task-gray-background w-fit px-3 py-2 md:px-6 mb-4 md:mb-6 rounded-[5px]'>
        <Image src={TrashIcon} alt="Trash Icon" width={40} height={40} className='invert' />
        <h1 className="ml-2 text-md md:text-base font-poppins">Tableros Eliminados</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center'>
        {deletedTasks.map((task) => (
          <RemovedTask key={task.id} id={task.id} name={task.name} taskNumber={task.taskNumber} />
        ))}
      </div>
    </div>
  )
}