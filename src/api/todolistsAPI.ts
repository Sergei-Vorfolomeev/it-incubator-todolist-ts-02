import axios from "axios";

export type TodolistAPIResponseType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '9b7bf10d-55fc-4d6e-b69f-50e6002c9999'
    }
})

export const todolistsAPI = {
    getTodolists () {
        return instance.get<TodolistAPIResponseType[]>('/todo-lists')
            .then(res => res.data)
    },
    removeTodolist (todolistId: string) {
        return instance.delete<{item: ResponseType}>(`/todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    addTodolist (title: string) {
        return instance.post<ResponseType<TodolistAPIResponseType>>('/todo-lists', {title})
            .then(res => res.data)
    },
    updateTodolist (todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    },
}

