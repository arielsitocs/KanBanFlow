import TaskTypes from '../types/Task';

import { formatDate } from '../utils/General';

export default function Task({ taskid, taskname, limitdate, priority, taskNumber }: TaskTypes) {

    // fecha formateada para mostrarlo en el frontend //
    const date = formatDate(limitdate);

    // funcion para verificar si la fecha de hoy es mayor a la fecha de vencimiento //
    const checkOverDue = () => {
        const deadline = new Date(limitdate);
        const today = new Date();
        // comparamos los timestamps directamente como fechas y no como strings //
        return today > deadline;
    }

    const isOverDue = checkOverDue();

    return (
        <div className={`bg-task-gray-background border-l-[3px] px-2 py-4 relative rounded-[3px] mb-3  hover:translate-y-[-4px] hover:bg-main hover:text-white 
        transition-all cursor-pointer ${priority === 'Alta' ? 'border-light-red' : priority === 'Media' ? 'border-orange' : 'border-green'} `}>
            <div className='flex'>
                <h1 className='mr-2 text-sm'>{taskNumber})</h1>
                <h1 className='text-sm'>{taskname}</h1>
                <p className={`${isOverDue ? 'text-red-700' : 'text-text-gray'} absolute top-1 right-1 text-[9px]`}>{date}</p>
            </div>
        </div>
    )
}