import {SetTodolistsACType} from "./todolistReducer";
import {TasksStateType} from "../features/TodolistsList/Todolist/Todolist";


const initialState: TasksStateType = {}

export const tasksReducer = (state: any = initialState, action: GeneralACTypes): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const copyState: TasksStateType  = {...state}
            action.payload.todolists.forEach(el => copyState[el.id] = [])
            return copyState
        }
        default:
            return state
    }
}

//actions


//thunks


//types
type GeneralACTypes = SetTodolistsACType
export type TaskAPIType = {
    description: string
    title: string
    completed: boolean
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TasksStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TasksPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later,
}
