import TaskTypes from '../types/Task';

export default function Table({ id, name, limitDate, priority, status }: TaskTypes) {
    return (
        <div className={`bg-task-gray-background border-l-[3px] px-2 py-4 relative rounded-[3px] mb-3  hover:translate-y-[-4px] hover:bg-main hover:text-white transition-all cursor-pointer ${priority === 'Alta' ? 'border-light-red' : priority === 'Media' ? 'border-orange' : 'border-green'}`}>
            <div className='flex'>
                <h1 className='mr-2 text-sm'>1)</h1>
                <h1 className='text-sm'>{name}</h1>
                <p className='absolute top-1 right-1 text-[9px] text-text-gray'>{limitDate}</p>
            </div>
        </div>
    )
}