import {Dispatch} from "redux";
import {TodolistAPIResponseType, todolistsAPI} from "../api/todolistsAPI";
import {TodolistDomainType} from "../features/TodolistsList/TodolistsList";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: GeneralACTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(el => ({...el, filter: 'all'}))
        }
        default:
            return state
    }
}


// actions
const setTodolistsAC = (todolists: TodolistAPIResponseType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

// thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res)))
}

// types

type GeneralACTypes = SetTodolistsACType
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>