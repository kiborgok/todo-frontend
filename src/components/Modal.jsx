import React from 'react';

import "../styles/modal.css";

const AppModal = ({ onClick, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main d-flex flex-column">
                {children}
                <button className="align-self-center btn btn-primary btn-sm mt-3 col-6" type="button" onClick={onClick}>
                    Close
        </button>
            </section>
        </div>
    );
};

export default AppModal;