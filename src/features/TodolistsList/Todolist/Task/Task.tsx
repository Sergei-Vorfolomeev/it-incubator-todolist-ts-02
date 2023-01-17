import React from 'react';
import {TaskAPIType, TasksStatuses} from "../../../../api/tasksAPI";
import {EditableSpan} from "../../../../components/EditableSpan";
import {TaskDomainModelType} from "../../../../store/tasksReducer";

type TaskPropsType = {
    task: TaskAPIType
    removeTask: (taskID: string) => void
    updateTask: (taskID: string, domainModel: TaskDomainModelType) => void
}

export const Task = (props: TaskPropsType) => {
    const {task, removeTask, updateTask} = props

    const changeCheckBoxHandler = (taskID: string, checkboxValue: boolean) => {
        updateTask(taskID, {status: checkboxValue ? TasksStatuses.Completed : TasksStatuses.New})
    }
    const changeTaskTitle = (newTitle: string, taskID: string) => {
        updateTask(taskID, {title: newTitle})
    }

    return (
        <li>
            <input
                type="checkbox"
                checked={!!props.task.status}
                onChange={(event) =>
                    changeCheckBoxHandler(task.id, event.currentTarget.checked)}
            />
            <EditableSpan title={props.task.title} changeTaskTitle={(newTitle) => changeTaskTitle(newTitle, props.task.id)}/>
            <button onClick={() => removeTask(task.id)}>X</button>
        </li>
    );
};
