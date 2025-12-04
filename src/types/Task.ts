interface TaskTypes {
    id: string;
    name: string;
    limitDate: string;
    priority: 'Alta' | 'Media' | 'Baja';
    status: 'pending' | 'in progress' | 'completed';
    state?: boolean;
    setState?: (state: boolean) => void;
}

export default TaskTypes;