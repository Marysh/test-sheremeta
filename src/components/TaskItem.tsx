import React, {useState} from 'react';
import {Task, TaskStatus} from "../interfaces";
import {capitalizeFirstLetter, formatDate} from "../helper";
import {Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface TaskItemProps {
    task: Task;
    onUpdateStatus: (taskId: number, status: TaskStatus) => void;
    onTaskDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
                                               task,
                                               onUpdateStatus,
                                               onTaskDelete,
                                           }) => {
    const [open, setOpen] = useState(false);

    const color = task.status === 'pending' ? 'bg-blue' :
        task.status === 'in progress' ? 'bg-yellow' : 'bg-green';

    return (
        <>
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell style={{width: '73%'}}
                       onClick={() => setOpen(!open)}>
                <div className="flex items-center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    <div className="text-lg flex-1 cursor-pointer truncate">{capitalizeFirstLetter(task.name)}</div></div>
            </TableCell>
            <TableCell style={{width: '15%'}}>
                <div className="flex items-center ml-2">
                    {task.dueDate && <>
                        <CalendarTodayOutlinedIcon color="action"/>
                        <span className="ml-2">{ formatDate(task.dueDate)}</span>
                    </>}
                </div>
            </TableCell>
            <TableCell style={{width: '10%'}}>
                <select id="status" name="status" className={`outline-none p-2 rounded ${color} text-white text-center`}
                        onChange={(e) =>
                            onUpdateStatus(task.id, e.target.value as TaskStatus)}
                        value={task.status}>
                    <option value="pending" id="pending">Pending</option>
                    <option value="in progress" id="in_progress">In Progress</option>
                    <option value="completed" id="completed">Completed</option>
                </select>
            </TableCell>
            <TableCell style={{width: '2%'}}>
                <IconButton aria-label="delete"
                            onClick={() => onTaskDelete(task.id)}>
                    <DeleteIcon color="action"/>
                </IconButton>
            </TableCell>
        </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <p className="p-4 text-lg">{task.description ? task.description : 'No description'}</p>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TaskItem;
