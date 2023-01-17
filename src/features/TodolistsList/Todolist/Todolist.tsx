import React, {useEffect} from 'react';
import {TodolistDomainType} from "../TodolistsList";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../store/store";
import {TasksStateType} from "../../../api/tasksAPI";
import {addTaskTC, getTasksTC, removeTaskTC, TaskDomainModelType, updateTaskTC} from "../../../store/tasksReducer";
import {InputComponent} from "../../../components/InputComponent";
import {Task} from "./Task/Task";

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
    const addTask = (title: string) => {
        dispatch(addTaskTC(id, title))
    }
    const updateTask = (taskID: string, domainModel: TaskDomainModelType) => {
        dispatch(updateTaskTC(id, taskID, domainModel))
    }

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <InputComponent callBack={addTask}/>
                <ul>
                    {tasks[id].map(el => {
                        return (
                            <Task key={el.id}
                                  task={el}
                                  removeTask={removeTask}
                                  updateTask={updateTask}/>
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
