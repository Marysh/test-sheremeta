import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {NewTask, Task, TaskStatus} from "../interfaces";

interface TasksState {
    tasks: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
};
const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', tasks ? JSON.stringify(tasks) : tasks);
};

const initialState: TasksState = {
    tasks: loadTasksFromLocalStorage(),
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        filterByStatus: (state, action: PayloadAction<TaskStatus>) => {
            state.tasks.filter(task => task.status === action.payload);
        },
        addTask: (state, action: PayloadAction<NewTask>) => {
            const maxId = Math.max(...state.tasks.map(task => task.id), 0);
            const newTask = { ...action.payload, id: maxId + 1 };
            state.tasks.push(newTask);
            saveTasksToLocalStorage(state.tasks);
        },
        updateTaskStatus: (
            state,
            action: PayloadAction<{ taskId: number; status: TaskStatus }>
        ) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.taskId
            );
            if (task) {
                task.status = action.payload.status;
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            saveTasksToLocalStorage(state.tasks);
        },
    },
});

export const { addTask, updateTaskStatus, deleteTask, filterByStatus } = tasksSlice.actions;
export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export default tasksSlice.reducer;
