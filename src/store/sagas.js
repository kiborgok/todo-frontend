import { take, put, call } from "redux-saga/effects";
import axios from "axios";
//import { history } from "../store/history";

import * as mutations from "./mutations";

const url = process.env.NODE_ENV === `production` ? `https://kibortodoapi.herokuapp.com` : "http://localhost:5000"

export function* taskFetchSaga() {
    while (true) {
        const { userId } = yield take(mutations.REQUEST_USER_TASKS);
        try {
            const { data } = yield call(() => axios.get(url + `/tasks/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }));
            if (!data.tasks) {
                throw new Error();
            }
            yield put(mutations.userTasksSuccess(data.tasks));
        } catch (error) {
            console.log(error);
        }
    }

}

export function* groupFetchSaga() {
    while (true) {
        try {
            yield take(mutations.REQUEST_GROUPS);
            const { data } = yield call(() => axios.get(url + `/groups`));
            if (!data.groups) {
                throw new Error();
            }
            yield put(mutations.requestGroupsSuccess(data.groups));
        } catch (error) {
            yield put(mutations.requestGroupsFailed());
        }
    }
}

export function* taskDeletionSaga() {
    while (true) {
        try {
            const { taskid } = yield take(mutations.REQUEST_TASK_DELETION);
            const { data } = yield call(() =>
                axios.delete(url + `/tasks/delete/${taskid}`)
            );
            if (!data) {
                throw new Error();
            }
            yield put(mutations.requestTaskDeletion(data.task._id));
        } catch (error) {
            //yield put(mutations.requestGroupsFailed());
        }
    }
}

export function* taskCreationSaga() {
    while (true) {
        const { name, owner, group } = yield take(mutations.REQUEST_TASK_CREATION);
        try {
            const { data } = yield call(() =>
                axios.post(url + `/tasks/new`, {
                    task: {
                        name,
                        owner,
                        group,
                    },
                })
            );
            if (!data) {
                throw new Error();
            }
            let _id = data.task._id;
            yield put(mutations.taskCreationSuccess(_id, name, owner, group));
        } catch (error) {
            yield put(mutations.taskCreationFailed());
        }
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_COMPLETE,
            mutations.SET_TASK_NAME,
        ]);
        yield call(() =>
            axios.post(url + `/tasks/update`, {
                task: {
                    _id: task._id,
                    group: task.group,
                    name: task.name,
                    isComplete: task.isComplete,
                },
            })
        );
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(
            mutations.REQUEST_AUTHENTICATE_USER
        );
        try {
            const { data } = yield axios.post(url + `/authenticate`, {
                username,
                password,
            });
            if (!data) {
                throw new Error();
            }
            localStorage.setItem("token", data.token);
            yield put(mutations.set_State(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
            window.location = "/";
        } catch (error) {
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}

export function* userRegistrationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_CREATE_USER);
        try {
            const { data } = yield axios.post(url + `/user/register`, {
                username,
                password,
            }
            );
            if (!data) {
                throw new Error();
            }
            localStorage.setItem("token", data.token);
            yield put(mutations.set_State(data.state));
            yield put(mutations.processRegisterUser(mutations.AUTHENTICATED));
            window.location = "/";
        } catch (error) {
            yield put(mutations.processRegisterUser(mutations.NOT_REGISTERED));
        }
    }
}