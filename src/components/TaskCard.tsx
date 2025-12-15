"use client"

import Task from './Task';
import TaskTypes from '../types/Task';
import TaskCardTypes from '../types/TaskCard';

import Image from 'next/image';

import CleanIcon from '../../public/clean-icon.svg';
import CreateIcon from '../../public/circle-create-icon.svg';

import NewTask from './forms/NewTask';
import Alert from '../components/ui/Alert';
import EditTask from './forms/EditTask';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

export default function TasksCard({ state, board, tasks }: TaskCardTypes) {

  const pendingTasks = tasks.filter((task: any) => task.boardid === board.boardid && task.status === 'pending')
  const inProgressTasks = tasks.filter((task: any) => task.boardid === board.boardid && task.status === 'in progress')
  const completedTasks = tasks.filter((task: any) => task.boardid === board.boardid && task.status === 'completed')

  const [newTaskState, setNewTaskState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [editTask, setEditTask] = useState({} as TaskTypes);
  const [editTaskState, setEditTaskState] = useState(false);

  const router = useRouter();

  const handleUpdateTask = (id: number) => {
    const updateTask = tasks.find((task: any) => task.taskid === id)

    console.log(updateTask)

    if (updateTask) {
      setEditTask(updateTask)
      setEditTaskState(true)
    }
  }

  return (
    <div className="h-[95%]">
      <div className={`border-t-[3px] ${state == 'pending' ? 'border-orange' : state == 'in progress' ? 'border-light-blue' : 'border-green'} task-card h-full flex flex-col`}>
        <div className='flex items-center justify-between mb-5'>
          <h1 className='bg-task-gray-background px-[10%] py-2 rounded-[5px]'>{state == 'pending' ? 'Tareas Pendientes' : state == 'in progress' ? 'Tareas en Progreso' : 'Tareas Completadas'}</h1>
          <div className='flex items-center'>
            <div className='bg-task-gray-background ml-2 shrink-0 p-2 rounded-[5px] hover:bg-main cursor-pointer transition-all group'>
              <Image src={CreateIcon} width={26} height={26} alt="create-icon" className="group-hover:brightness-0 group-hover:invert transition-all" onClick={() => setNewTaskState(true)} />
            </div>
            <div className='bg-task-gray-background ml-2 shrink-0 p-2 rounded-[5px] hover:bg-main cursor-pointer transition-all group'>
              <Image src={CleanIcon} width={26} height={26} alt="clean-icon" className="group-hover:brightness-0 group-hover:invert transition-all" onClick={() => setAlertState(true)} />
            </div>
          </div>
        </div>
        <div className='flex-1 w-full'>
          {
            state == 'in progress' ? (
              inProgressTasks.length > 0 ?
                inProgressTasks.map((task: any) => (
                  <div key={task.taskid} onClick={() => handleUpdateTask(task.taskid)}>
                    <Task key={task.taskid} taskid={task.taskid} taskname={task.taskname} limitdate={task.limitdate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                  </div>
                ))
                : <div className='w-full h-full flex items-center justify-center bg-task-gray-background'>
                  <h1 className="text-center text-text-gray">Aun no hay tareas creadas!</h1>
                </div>
            ) : state == 'completed' ? (
              completedTasks.length > 0 ?
                completedTasks.map((task: any) => (
                  <div key={task.taskid} onClick={() => handleUpdateTask(task.taskid)}>
                    <Task key={task.taskid} taskid={task.taskid} taskname={task.taskname} limitdate={task.limitdate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                  </div>
                ))
                : <div className='w-full h-full flex items-center justify-center bg-task-gray-background'>
                  <h1 className="text-center text-text-gray">Aun no hay tareas creadas!</h1>
                </div>
            ) : state == 'pending' ? (
              pendingTasks.length > 0 ?
                pendingTasks.map((task: any) => (
                  <div key={task.taskid} onClick={() => handleUpdateTask(task.taskid)}>
                    <Task key={task.taskid} taskid={task.taskid} taskname={task.taskname} limitdate={task.limitdate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                  </div>
                ))
                : <div className='w-full h-full flex items-center justify-center bg-task-gray-background'>
                  <h1 className="text-center text-text-gray">Aun no hay tareas creadas!</h1>
                </div>
            ) : <h1 className='text-red-500 text-center font-poppins'>Tipo de tablero no valido</h1>
          }
        </div>
      </div>
      <NewTask board={board} state={newTaskState} setState={setNewTaskState} />
      <Alert message="Estás seguro de eliminar todas las tareas?" prop="Se eliminarán todas las tareas de esta tabla"
        type='confirm' status={alertState} setStatus={setAlertState} action={() => { }} />
      <EditTask board={board} taskid={editTask.taskid} taskname={editTask.taskname} limitdate={editTask.limitdate} priority={editTask.priority} status={editTask.status} state={editTaskState} setState={setEditTaskState} />
    </div>
  )
}