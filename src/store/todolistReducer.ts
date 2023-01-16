import {Dispatch} from "redux";
import {TodolistAPIType, todolistsAPI} from "../api/todolistsAPI";
import {TodolistDomainType} from "../features/TodolistsList/TodolistsList";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: GeneralACTypes) => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return [...action.payload.todolists]
        }
        default:
            return state
    }
}


// actions
const setTodolistsAC = (todolists: TodolistAPIType[]) => {
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
type SetTodolistsACType = ReturnType<typeof setTodolistsAC>