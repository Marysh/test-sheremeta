import {Button, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addTask} from "../store/taskSlice";
import {NewTask} from "../interfaces";
import {Box} from "@mui/material";

const initialState: NewTask = {
    name: '',
    description: '',
    dueDate: '',
    status: 'pending',
}
interface Props {
    onClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NewTaskForm: React.FC<Props> = ({onClose}) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState<NewTask>( {...initialState});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
         dispatch(addTask(task));
        setTask({...initialState});
        onClose();
    };

    return (
        <Box sx={style}>
            <form
                onSubmit={handleSubmit}
            >
                <TextField
                    fullWidth
                    label="Task Name"
                    id="name"
                    name="name"
                    required
                    margin="normal"
                    value={task.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Task Description"
                    id="description"
                    name="description"
                    margin="normal"
                    value={task.description}
                    onChange={handleChange}
                />
                <div className="flex items-baseline justify-between">
                    <TextField
                        label="Due Date"
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" style={{height: 40, backgroundColor: "#13ce66", color: 'white'}}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Box>
    )
}

export default NewTaskForm;