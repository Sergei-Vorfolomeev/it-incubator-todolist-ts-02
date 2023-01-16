import React from 'react';
import {TodolistDomainType} from "../TodolistsList";
import {TaskAPIType} from "../../../store/tasksReducer";

type TodolistPropsType = {
    todolist: TodolistDomainType
}
export type TasksStateType = {
    [key:string]: TaskAPIType[]
}


export const Todolist: React.FC<TodolistPropsType> = ({todolist}) => {

    const {id, title, filter} = todolist

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
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
