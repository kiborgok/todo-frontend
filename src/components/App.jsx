import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { IntlProvider } from "react-intl";
import Layout from "./Layout";
import messages from "../messages";
import "../styles/App.scss";

function App() {
    const [locale, setLocale] = useState("en");

    return (
        <Router>
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <Layout setLocale={setLocale} />
                </IntlProvider>
            </Provider>
        </Router>
    );
}

export default App;