import {SetTodolistsACType} from "./todolistReducer";
import {Dispatch} from "redux";
import {TaskAPIModelType, TaskAPIType, tasksAPI, TasksPriorities, TasksStateType, TasksStatuses} from "../api/tasksAPI";
import {AppRootStateType} from "./store";


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
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID].map((el: TaskAPIType) => el.id === action.payload.taskID ? {...el, ...action.payload.task} : el)]
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
const addTaskAC = (todolistID: string, task: TaskAPIType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID, task
        }
    } as const
}
const updateTaskAC = (todolistID: string, taskID: string, task: TaskAPIType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID, taskID, task
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
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todolistID, title)
        .then(res => dispatch(addTaskAC(todolistID, res.data.item)))
}
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: TaskDomainModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(el => el.id === taskID)
        if (!task){
            console.warn('Task not found in the state')
            return;
        }
        const taskAPIModel: TaskAPIModelType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        tasksAPI.updateTask(todolistID, taskID, taskAPIModel)
            .then(res => {
                dispatch(updateTaskAC(todolistID, taskID, res.data.item))
            })
    }

//types
type GeneralACTypes =
    | SetTodolistsACType
    | GetTasksACType
    | RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
type GetTasksACType = ReturnType<typeof getTasksAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>


type TaskDomainModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TasksStatuses
    priority?: TasksPriorities
    startDate?: string
    deadline?: string
}


