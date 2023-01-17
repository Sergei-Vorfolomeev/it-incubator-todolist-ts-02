import axios from "axios";

export type TasksStateType = {
    [key:string]: TaskAPIType[]
}

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
type ResponseType = {
    items: TaskAPIType[],
    totalCount: number
    error: string
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

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '9b7bf10d-55fc-4d6e-b69f-50e6002c9999'
    }
})

export type TaskAPIModelType = {
    title: string
    description: string
    completed: boolean
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    removeTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res => res.data)
    },
    addTask (todolistID: string, title: string) {
        return instance.post(`/todo-lists/${todolistID}/tasks`, {title})
            .then(res => res.data)
    },
    updateTask (todolistID: string, taskID: string, model: TaskAPIModelType) {
        return instance.put(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
            .then(res => res.data)
    }
}