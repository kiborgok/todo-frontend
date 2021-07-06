import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { getCurrentUser } from "../services/auth";
import { Redirect } from "react-router-dom";

export const Login = ({ authenticateUSer, authenticated }) => {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
        <div className="d-flex flex-grow-1 justify-content-center p-18">
            <form
                className="d-flex flex-column align-self-center align-items-center w-75"
                onSubmit={authenticateUSer}
            >
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control mt-2"
                />
                {authenticated === mutations.NOT_AUTHENTICATED ? (
                    <p style={{ color: "red" }}>
                        Invalid username/password
                    </p>
                ) : null}
                <button type="submit" className="form-control mt-2 btn btn-primary">
                    Submit
        </button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUSer(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    },
});

export const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);