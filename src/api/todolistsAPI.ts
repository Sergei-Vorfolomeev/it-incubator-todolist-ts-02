import axios from "axios";

export type TodolistAPIType = {
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
        'API-KEY': 'd72a289b-3051-456d-82d6-68881a29ae5a'
    }
})

export const todolistsAPI = {
    getTodolists () {
        return instance.get<TodolistAPIType[]>('/todo-lists')
            .then(res => res.data)
    },
    removeTodolist (todolistId: string) {
        return instance.delete<{item: ResponseType}>(`/todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    addTodolist (title: string) {
        return instance.post<ResponseType<TodolistAPIType>>('/todo-lists', {title})
            .then(res => res.data)
    },
    updateTodolist (todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    },
}

