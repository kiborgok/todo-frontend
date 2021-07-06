import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const TaskDetail = ({
    id,
    task,
    groups,
    comments,
    isComplete,
    setTaskCompletion,
    setTaskGroup,
    setTaskName,
}) => {
    return (
        <div className="card p-3">
            <div>
                <textarea
                    rows="2"
                    onChange={setTaskName}
                    value={task.name}
                    name="name"
                    className="form-control form-control-lg"
                />
            </div>
            <button
                className="btn btn-primary mt-3"
                onClick={() => setTaskCompletion(id, !isComplete)}
            >
                {isComplete ? "Reopen" : "Complete"}
            </button>
            <div className="mt-3">
                <select
                    onChange={setTaskGroup}
                    value={JSON.stringify(task.group)}
                    className="form-control"
                >
                    {groups.map((group) => {
                        return (
                            <option
                                key={group._id}
                                value={JSON.stringify(group)}
                                style={{ width: "20px" }}
                            >
                                {group.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.id;
    let task = state.tasks.data.find((task) => task._id === id);
    let groups = state.groups.data;
    let isComplete = task.isComplete;
    return {
        id,
        task,
        groups,
        isComplete,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let _id = ownProps.id;
    //let task = ownProps.task;
    return {
        setTaskCompletion(_id, isComplete) {
            dispatch(mutations.setTaskCompletion(_id, isComplete));
        },
        setTaskGroup(e) {
            dispatch(mutations.setTaskGroup(_id, JSON.parse(e.target.value)));
        },
        setTaskName(e) {
            const name = e.target.value.toString().length;
            if (name < 1) return;
            dispatch(mutations.setTaskName(_id, e.target.value));
        },
    };
};

export const ConnectedTaskDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetail);