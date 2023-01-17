import {Dispatch} from "redux";
import {TodolistAPIResponseType, todolistsAPI} from "../api/todolistsAPI";
import {FilterValueType, TodolistDomainType} from "../features/TodolistsList/TodolistsList";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: GeneralACTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(el => ({...el, filter: 'all'}))
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.filterValue} : el)
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
export const changeFilterAC = (todolistID: string, filterValue: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID, filterValue
        }
    } as const
}

// thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res)))
}

// types

type GeneralACTypes =
    | SetTodolistsACType
    | ChangeFilterACType
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>