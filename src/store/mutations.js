export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const REQUEST_CREATE_USER = `REQUEST_CREATE_USER`;
export const PROCESSING_REGISTER_USER = `PROCESSING_REGISTER_USER`;
export const REGISTERING = `REGISTERING`;
export const NOT_REGISTERED = `NOT_REGISTERED`;
export const CREATING_TASK = `CREATING_TASK`;
export const TASK_CREATED = `TASK_CREATED`;
export const REQUEST_USER_TASKS = `REQUEST_USER_TASKS`;
export const REQUEST_GROUPS = `REQUEST_GROUPS`;
export const REQUEST_GROUPS_SUCCESS = `REQUEST_GROUPS_SUCCESS`;
export const REQUEST_GROUPS_FAILED = `REQUEST_GROUPS_FAILED`;
export const FETCHED_GROUPS = `FETCHED_GROUPS`;
export const SET_GROUPS = `SET_GROUPS`;
export const USER_TASKS_SUCCESS = `USER_TASKS_SUCCESS`;
export const USER_TASKS_FAILED = `USER_TASKS_FAILED`;
export const REQUEST_TASK_DELETION = `REQUEST_TASK_DELETION`;
export const TASK_CREATION_SUCCESS = `TASK_CREATION_SUCCESS`;
export const TASK_CREATION_FAILED = `TASK_CREATION_FAILED`;

export const requestUserTasks = (userId) => ({
    type: REQUEST_USER_TASKS,
    userId,
});

export const userTasksSuccess = (tasks) => ({
    type: USER_TASKS_SUCCESS,
    tasks,
});

export const userTasksFailed = () => ({
    type: USER_TASKS_FAILED,
});

export const requestGroups = () => ({
    type: REQUEST_GROUPS,
});

export const requestGroupsSuccess = (groups) => ({
    type: REQUEST_GROUPS_SUCCESS,
    groups,
});

export const requestGroupsFailed = () => ({
    type: REQUEST_GROUPS_FAILED,
});

export const requestTaskDeletion = (taskid) => ({
    type: REQUEST_TASK_DELETION,
    taskid
});

export const requestTaskCreation = (name, owner, group) => ({
    type: REQUEST_TASK_CREATION,
    name,
    owner,
    group
});

export const taskCreationSuccess = (_id, name, owner, group) => ({
    type: TASK_CREATION_SUCCESS,
    _id,
    name,
    owner,
    group,
});

export const taskCreationFailed = () => ({
    type: TASK_CREATION_FAILED,
});

export const setTaskCompletion = (_id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    _id,
    isComplete,
});

export const setTaskName = (_id, name) => ({
    type: SET_TASK_NAME,
    _id,
    name,
});

export const setTaskGroup = (_id, group) => ({
    type: SET_TASK_GROUP,
    _id,
    group,
});

export const requestRegisterUser = (username, password) => ({
    type: REQUEST_CREATE_USER,
    username,
    password,
});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password,
});

export const processAuthenticateUser = (
    status = AUTHENTICATING,
    session = null
) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status,
});

export const processRegisterUser = (status = REGISTERING, session = null) => ({
    type: PROCESSING_REGISTER_USER,
    session,
    authenticated: status,
});


export const set_State = (state = {}) => ({
    type: SET_STATE,
    state,
});