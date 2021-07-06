import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { getCurrentUser } from "../services/auth";
import AppModal from "./Modal";
import { ConnectedTask } from "./Task";


const user = getCurrentUser();

const TaskList = ({ loading, error, tasks, groups, name, createNewTask }) => {
    const [showForm, setShowForm] = useState(false)
    return (
        <div
            style={{
                color: name === "To Do" ? "tomato" : name === "Doing" ? "orange" : "green"
            }}
            className="card p-2 m-2 task-group-box"
        >
            <h3>{name}</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Failed to load tasks. Try again</p>
            ) : (
                        tasks.map((task) => (
                            <ConnectedTask
                                key={task._id}
                                task={task}
                                id={task._id}
                                groups={groups}
                            />
                        ))
                    )}
            <AppModal show={showForm} onClick={() => setShowForm(false)}>
                <form onSubmit={createNewTask}>
                    <div>
                        <input
                            type="text"
                            placeholder="Task Name"
                            name="name"
                            className="form-control mt-2"
                        />
                    </div>
                    <button type="submit" className="form-control mt-2 btn btn-primary">
                        Create task
          </button>
                </form>
            </AppModal>
            <button
                className="form-control mt-2 btn btn-primary"
                onClick={() => setShowForm(true)}
            >
                + Task
      </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const _id = ownProps._id;
    return {
        name: ownProps.name,
        _id,
        tasks: state.tasks.data.filter((task) => task.group._id === _id),
        groups: state.groups.data,
        loading: state.tasks.loading,
        error: state.tasks.error,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const group = { _id: ownProps._id, name: ownProps.name };
    const owner = user ? user._id : {};
    return {
        createNewTask(e) {
            e.preventDefault();
            let name = e.target[`name`].value;
            if (name === "") return;
            dispatch(requestTaskCreation(name, owner, group));
            e.target[`name`].value = "";
        }
    };
};

export const ConnectedTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);