import React from 'react';
import {TaskAPIType, TasksStatuses} from "../../../../api/tasksAPI";

type TaskPropsType = {
    task: TaskAPIType
    removeTask: (taskID: string) => void
    updateTask: (taskID: string, status: TasksStatuses) => void
}

export const Task = (props: TaskPropsType) => {

    const changeCheckBoxHandler = (taskID: string, checkboxValue: boolean) => {
        props.updateTask(taskID, checkboxValue ? TasksStatuses.Completed : TasksStatuses.New)
    }

    return (
        <li>
            <input
                type="checkbox"
                checked={!!props.task.status}
                onChange={(event) =>
                    changeCheckBoxHandler(props.task.id, event.currentTarget.checked)}
            />
            <span>{props.task.title}</span>
            <button onClick={() => props.removeTask(props.task.id)}>X</button>
        </li>
    );
};
