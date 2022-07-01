import React from "react";
import { FaBars } from "react-icons/fa";
import { Route, Switch } from "react-router-dom";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import LogOut from "./LogOut";
import { ConnectedTaskDetail } from "./TaskDetail";
import { ConnectedRegister } from "./Register";
//import { getCurrentUser } from "../services/auth";
import ProtectedRoute from "./protectedRoute";

const Main = ({
    handleToggleSidebar
}) => {
    return (
        <main>
            <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                <FaBars />
            </div>
            <Switch>
                <Route path="/register" render={() => <ConnectedRegister />} />
                <Route path="/login" render={() => <ConnectedLogin />} />
                <Route path="/signout" render={() => <LogOut />} />
                <ProtectedRoute
                    path="/task/:id"
                    render={(props) => <ConnectedTaskDetail {...props} />}
                />
                <ProtectedRoute
                    path="/"
                    render={(props) => <ConnectedDashboard {...props} />}
                />
            </Switch>
            <footer>
                <small>
                    Copyright © 2021 -{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://kiborgok-portfolio.herokuapp.com/"
                    >
                        Kiborgok
          </a>
                </small>
                <br />
                <div className="social-bagdes">
                    <a
                        href="https://twitter.com/Wangari_TJ"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt="Twitter Follow"
                            src="https://img.shields.io/twitter/follow/Wangari_TJ?label=twitter&style=social"
                        />
                    </a>
                </div>
            </footer>
        </main>
    );
};

export default Main;
