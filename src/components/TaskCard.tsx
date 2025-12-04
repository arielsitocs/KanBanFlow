"use client"

import { tasks as allTasks } from '../data/tasks.json';

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

export default function TasksCard({ state, board }: TaskCardTypes) {
  const pendingTasks = allTasks.filter((task) => task.boardId === board.id && task.status === 'pending')
  const inProgressTasks = allTasks.filter((task) => task.boardId === board.id && task.status === 'in progress')
  const completedTasks = allTasks.filter((task) => task.boardId === board.id && task.status === 'completed')

  const [newTaskState, setNewTaskState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [editTask, setEditTask] = useState({} as TaskTypes);
  const [editTaskState, setEditTaskState] = useState(false);

  const handleUpdateTask = (id: string) => {
    const updateTask = allTasks.find((task) => task.id === id) as TaskTypes

    if (updateTask) {
      setEditTask(updateTask)
      setEditTaskState(true)
    }
  }

  return (
    <div>
      <div className={`border-t-[3px] ${state == 'pending' ? 'border-orange' : state == 'in progress' ? 'border-light-blue' : 'border-green'} task-card`}>
        <div className='flex items-center justify-between mb-5'>
          <h1 className='bg-task-gray-background px-[10%] py-2 rounded-[5px]'>{state == 'pending' ? 'Tareas Pendientes' : state == 'in progress' ? 'Tareas en Progreso' : 'Tareas Completadas'}</h1>
          <div className='flex items-center'>
            <div className='bg-task-gray-background ml-2 shrink-0 p-2 rounded-[5px] hover:bg-main cursor-pointer transition-all group'>
              <Image src={CreateIcon} width={26} height={26} alt="create-icon" className="group-hover:brightness-0 group-hover:invert transition-all" />
            </div>
            <div className='bg-task-gray-background ml-2 shrink-0 p-2 rounded-[5px] hover:bg-main cursor-pointer transition-all group'>
              <Image src={CleanIcon} width={26} height={26} alt="clean-icon" className="group-hover:brightness-0 group-hover:invert transition-all" onClick={() => setAlertState(true)} />
            </div>
          </div>
        </div>
        <div>
          {
            state == 'in progress' ?
              inProgressTasks.map((task) => {
                return (
                  <div key={task.id} onClick={() => handleUpdateTask(task.id)}>
                    <Task key={task.id} id={task.id} name={task.name} limitDate={task.limitDate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                  </div>
                )
              })
              : state == 'completed' ?
                completedTasks.map((task) => {
                  return (
                    <div key={task.id} onClick={() => handleUpdateTask(task.id)}>
                      <Task key={task.id} id={task.id} name={task.name} limitDate={task.limitDate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                    </div>
                  )
                }) :
                pendingTasks.map((task) => {
                  return (
                    <div key={task.id} onClick={() => handleUpdateTask(task.id)}>
                      <Task key={task.id} id={task.id} name={task.name} limitDate={task.limitDate} priority={task.priority as TaskTypes['priority']} status={task.status as TaskTypes['status']} />
                    </div>
                  )
                })
          }
        </div>
      </div>
      <NewTask boardName={board.title} state={newTaskState} setState={setNewTaskState} />
      <Alert message="Estás seguro de eliminar todas las tareas?" prop="Se eliminarán todas las tareas de esta tabla"
        type='confirm' status={alertState} setStatus={setAlertState} action={() => { }} />
      <EditTask id={editTask.id} name={editTask.name} limitDate={editTask.limitDate} priority={editTask.priority} status={editTask.status} state={editTaskState} setState={setEditTaskState} />
    </div>
  )
}