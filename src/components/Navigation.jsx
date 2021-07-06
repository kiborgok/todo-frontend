import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export const Navigation = () => (
    <>
        <Link to="/">Dashboard</Link>
        <br></br>
        {getCurrentUser() ? null : <Link to="/register">Register</Link>}
    </>
);

const mapStateToProps = (state) => state;

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);