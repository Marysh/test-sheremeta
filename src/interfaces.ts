export type TaskStatus = 'pending' | 'in progress' | 'completed';

export interface NewTask {
    name: string;
    description?: string;
    dueDate?: string;
    status?: TaskStatus;
}

export interface Task extends NewTask {
    id: number;
}