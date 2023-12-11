import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTasks,
    updateTaskStatus,
    deleteTask
} from '../store/taskSlice';
import TaskItem from './TaskItem';
import {TaskStatus} from "../interfaces";
import {
    Table, TableBody, TableContainer, Paper, Modal
} from "@mui/material";
import NewTaskForm from "./NewTaskForm";
import {Button} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

const TaskList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();
    const handleUpdateStatus = (taskId: number, status: TaskStatus) => {
        dispatch(updateTaskStatus({ taskId, status }));
    };

    const handleTaskDelete = (taskId: number) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <>
            <div className="bg-grey border-s-grey rounded-t-md p-4 flex justify-between items-center">
                    <span className="text-xl font-bold">Tasks</span>
                    <Button onClick={handleOpen}
                            variant="outlined"
                            style={{
                                borderRadius: '20px',
                                color: '#2F80ED',
                                borderColor: '#2F80ED',
                                padding: '10px 20px',
                            }}>
                        <AddIcon/> Add task
                    </Button>
                    <Modal
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <NewTaskForm onClose={handleClose} />
                        </>
                    </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableBody>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onUpdateStatus={handleUpdateStatus}
                                onTaskDelete={handleTaskDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TaskList;
