interface TaskTypes {
    taskid: number;
    taskname: string;
    limitdate: string;
    priority: 'Alta' | 'Media' | 'Baja';
    status: 'pending' | 'in progress' | 'completed';
    taskNumber?: number;
    boardid?: number;
    state?: boolean;
    setState?: (state: boolean) => void;
    board?: any;
}

export default TaskTypes;