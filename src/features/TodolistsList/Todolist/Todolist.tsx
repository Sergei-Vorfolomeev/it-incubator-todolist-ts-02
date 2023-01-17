import React, {useEffect} from 'react';
import {FilterValueType, TodolistDomainType} from "../TodolistsList";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../store/store";
import {TaskAPIType, TasksStatuses} from "../../../api/tasksAPI";
import {addTaskTC, getTasksTC, removeTaskTC, TaskDomainModelType, updateTaskTC} from "../../../store/tasksReducer";
import {InputComponent} from "../../../components/InputComponent";
import {Task} from "./Task/Task";
import {changeFilterAC} from "../../../store/todolistReducer";

type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist: React.FC<TodolistPropsType> = ({todolist}) => {

    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, TaskAPIType[]>(state => state.tasks[id])
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
    const changeFilter = (filterValue: FilterValueType) => {
        dispatch(changeFilterAC(id, filterValue))
    }
    if (filter === 'active') {
        tasks = tasks.filter(el => el.status === TasksStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(el => el.status === TasksStatuses.Completed)
    }

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [dispatch, id])

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <InputComponent callBack={addTask}/>
                <ul>
                    {tasks.map(el => {
                        return (
                            <Task key={el.id}
                                  task={el}
                                  removeTask={removeTask}
                                  updateTask={updateTask}/>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => changeFilter('all')}>All</button>
                    <button onClick={() => changeFilter('active')}>Active</button>
                    <button onClick={() => changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};
