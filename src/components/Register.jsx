import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { getCurrentUser } from "../services/auth";
import { Redirect } from "react-router-dom";

export const Register = ({ registerUSer, authenticated }) => {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
        <div className="d-flex flex-grow-1 justify-content-center p-18">
            <form
                className="d-flex flex-column align-self-center align-items-center w-75"
                onSubmit={registerUSer}
            >
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
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
                {authenticated === mutations.NOT_REGISTERED && (
                    <p>Problem registering...</p>
                )}
                {authenticated === mutations.AUTHENTICATED && (
                    <p>Registered Successfully</p>
                )}
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
    registerUSer(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestRegisterUser(username, password));
    },
});

export const ConnectedRegister = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);