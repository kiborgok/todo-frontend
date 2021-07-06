import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";
import * as mutations from "../store/mutations";
import { getCurrentUser } from "../services/auth";
import { FaExclamationCircle } from "react-icons/fa";
const Dashboard = ({
    groups,
    tasks,
    loading,
    error,
    fetchGroups,
    fetchTasks,
}) => {
    useEffect(() => {
        groups.length === 0 && fetchGroups();
    }, [groups.length, fetchGroups]);

    useEffect(() => {
        tasks.length === 0 && fetchTasks();
    }, [tasks.length, fetchTasks]);

    return loading ? (
        <div
            className="row"
            style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        >
            <h2>Loading...</h2>
        </div>
    ) : error ? (
        <div
            className="row"
            style={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="d-flex flex-column align-items-center"
            >
                <FaExclamationCircle size={50} />
                <p>Network error</p>
            </div>
        </div>
    ) : (
                <div className="row">
                    {groups.map((group) => (
                        <div style={{
                            minWidth: "300px"
                        }} className="col" key={group._id}>
                            <ConnectedTaskList tasks={tasks} _id={group._id} name={group.name} />
                        </div>
                    ))}
                </div>
            );
};

const mapStateToProps = (state) => ({
    groups: state.groups.data,
    loading: state.groups.loading,
    error: state.groups.error,
    tasks: state.tasks.data,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGroups() {
            dispatch(mutations.requestGroups());
        },
        fetchTasks() {
            const user = getCurrentUser();
            dispatch(mutations.requestUserTasks(user._id));
        },
    };
};

export const ConnectedDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);