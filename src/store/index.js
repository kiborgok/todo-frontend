import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { defaultState } from "../defaultState";
import * as sagas from "./sagas";
import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        tasks(tasks = { data: [], error: false, loading: false }, action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return {
                        ...tasks,
                        data: action.state.tasks,
                        loading: false,
                        error: false,
                    };
                case mutations.REQUEST_USER_TASKS:
                    return { ...tasks, data: [], error: false, loading: true };
                case mutations.USER_TASKS_SUCCESS:
                    return { ...tasks, data: action.tasks, error: false, loading: false };
                case mutations.USER_TASKS_FAILED:
                    return { ...tasks, data: [], error: true, loading: false };
                case mutations.REQUEST_TASK_CREATION:
                    return {
                        ...tasks,
                        data: [...tasks.data],
                        error: false,
                        loading: false,
                    };
                case mutations.REQUEST_TASK_DELETION:
                    return {
                        ...tasks,
                        data: [...tasks.data.filter(task => task._id !== action.taskid)],
                        error: false,
                        loading: false,
                    };
                case mutations.TASK_CREATION_SUCCESS:
                    return {
                        ...tasks,
                        data: [
                            ...tasks.data,
                            {
                                _id: action._id,
                                name: action.name,
                                group: action.group,
                                owner: action.owner,
                                isComplete: false,
                            },
                        ],
                        loading: false,
                        error: false,
                    };
                case mutations.TASK_CREATION_FAILED:
                    return {
                        ...tasks,
                        data: [...tasks.data],
                        error: true,
                        loading: false,
                    };
                case mutations.SET_TASK_COMPLETE:
                    return {
                        ...tasks,
                        data: [
                            ...tasks.data.map((task) =>
                                task._id === action._id
                                    ? { ...task, isComplete: action.isComplete }
                                    : task
                            ),
                        ],
                    };
                case mutations.SET_TASK_NAME:
                    return {
                        ...tasks,
                        data: [
                            ...tasks.data.map((task) =>
                                task._id === action._id
                                    ? {
                                        ...task,
                                        name: action.name,
                                    }
                                    : task
                            ),
                        ],
                    };
                case mutations.SET_TASK_GROUP:
                    return {
                        ...tasks,
                        data: [
                            ...tasks.data.map((task) =>
                                task._id === action._id
                                    ? {
                                        ...task,
                                        group: action.group,
                                    }
                                    : task
                            ),
                        ],
                    };
                default:
                    return tasks;
            }
        },
        users(users = [], action) {
            return users;
        },
        groups(groups = { loading: false, error: false, data: [] }, action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return { ...groups, data: action.state.groups };
                case mutations.REQUEST_GROUPS:
                    return { ...groups, loading: true, error: false };
                case mutations.REQUEST_GROUPS_SUCCESS:
                    return {
                        ...groups,
                        data: action.groups,
                        loading: false,
                        error: false,
                    };
                case mutations.REQUEST_GROUPS_FAILED:
                    return { ...groups, data: [], error: true, loading: false };
                default:
                    return groups;
            }
        },
        comments(comments = [], action) {
            return comments;
        },
        session(userSession = defaultState.session || {}, action) {
            const { type, session, authenticated } = action;
            switch (type) {
                case mutations.SET_STATE:
                    return { ...userSession, user: action.state.session.user };
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING };
                case mutations.REQUEST_CREATE_USER:
                    return { ...userSession, authenticated: mutations.REGISTERING };
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, session, authenticated };
                case mutations.PROCESSING_REGISTER_USER:
                    return { ...userSession, authenticated };
                default:
                    return userSession;
            }
        },
    }),
    applyMiddleware(NODE_ENV === "development" && createLogger(), sagaMiddleware)
);

//sagaMiddleware.run(watcherSaga);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}