import React, { useState } from 'react';
import { connect } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ConnectedTaskDetail } from "./TaskDetail";
import AppModal from "./Modal";
import * as mutations from "../store/mutations";

const Task = ({
    task,
    groups,
    comments,
    isComplete,
    setTaskCompletion,
    setTaskGroup,
    setTaskName,
    deleteTask,
}) => {
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [isShown, setIsShown] = useState(false);
    return (
        <div>
            <AppModal show={showTaskDetail} onClick={() => setShowTaskDetail(false)}>
                <ConnectedTaskDetail
                    id={task._id}
                    task={task}
                    groups={groups}
                    comments={comments}
                    isComplete={isComplete}
                    setTaskCompletion={setTaskCompletion}
                    setTaskGroup={setTaskGroup}
                    setTaskName={setTaskName}
                />
            </AppModal>
            <div
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                className="flex-row flex-wrap justify-content-between card p-2 mt-2 task-box"
            >
                <p style={{ margin: 0 }}>{task.name}</p>
                <div className="d-flex align-items-center flex-row pl-2">
                    <div className={isShown ? "d-flex" : "d-none"}>
                        <FaEdit
                            onClick={() => setShowTaskDetail(true)}
                            className="m-1 text-primary cursor-to-pointer"
                        />
                        <FaTrash
                            onClick={() => deleteTask(task)}
                            className="m-1 text-danger cursor-to-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.id;
    let task = state.tasks.data.find((task) => task._id === id);
    return {
        task,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask(task) {
            dispatch(mutations.requestTaskDeletion(task._id));
        },
    };
};

export const ConnectedTask = connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);