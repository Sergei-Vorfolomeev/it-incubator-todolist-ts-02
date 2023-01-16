import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolistReducer";
import {tasksReducer} from "./tasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const AppDispatch = () => useDispatch<AppThunkDispatchType>()

//@ts-ignore
window.store = store