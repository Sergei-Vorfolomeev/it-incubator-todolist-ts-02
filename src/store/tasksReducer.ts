import {SetTodolistsACType} from "./todolistReducer";
import {Dispatch} from "redux";
import {TaskAPIType, tasksAPI, TasksStateType} from "../api/tasksAPI";


const initialState: TasksStateType = {}

export const tasksReducer = (state: any = initialState, action: GeneralACTypes): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const copyState: TasksStateType = {...state}
            action.payload.todolists.forEach(el => copyState[el.id] = [])
            return copyState
        case "GET-TASKS":
            return {...state, [action.payload.todolistID]: action.payload.tasks}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter((el: TaskAPIType) => el.id !== action.payload.taskID)
        }
        default:
            return state
    }
}

//actions
const getTasksAC = (todolistID: string, tasks: TaskAPIType[]) => {
    return {
        type: 'GET-TASKS',
        payload: {
            todolistID, tasks
        }
    } as const
}
const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID, taskID
        }
    } as const
}

//thunks
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistID)
        .then(res => dispatch(getTasksAC(todolistID, res.items)))
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    tasksAPI.removeTask(todolistID, taskID)
        .then(res => dispatch(removeTaskAC(todolistID, taskID)))
}

//types
type GeneralACTypes =
    | SetTodolistsACType
    | GetTasksACType
    | RemoveTaskACType
type GetTasksACType = ReturnType<typeof getTasksAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>

