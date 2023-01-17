import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Todolist} from "./Todolist/Todolist";
import {getTodolistsTC} from "../../store/todolistReducer";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = {
    id: string
    title: string
    filter: FilterValueType
}

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolist)
    const dispatch = AppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])
    return (
        <div>
            {todolists.map(el => {
                return (
                    <Todolist key={el.id} todolist={el}/>
                )
            })}
        </div>
    );
};
