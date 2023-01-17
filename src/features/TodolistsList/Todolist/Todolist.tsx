import React, {useEffect} from 'react';
import {TodolistDomainType} from "../TodolistsList";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../store/store";
import {TasksStateType} from "../../../api/tasksAPI";
import {getTasksTC, removeTaskTC} from "../../../store/tasksReducer";

type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist: React.FC<TodolistPropsType> = ({todolist}) => {

    const {id, title, filter} = todolist
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = AppDispatch()

    const removeTask = (taskID: string) => {
        dispatch(removeTaskTC(id, taskID))
    }

    useEffect( () => {
        dispatch(getTasksTC(id))
    }, [])

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks[id].map(el => {
                        return (
                            <li><
                                input type="checkbox" checked={true}/>
                                <span>{el.title}</span>
                                <button onClick={() => removeTask(el.id)}>X</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};
