import React from "react";
import classes from "./style.module.scss";
import {observer} from "mobx-react";

interface IProps {
    closeModal: () => void,
}

const ModalHeader = ({closeModal}: IProps) => {
    return (
        <div className={classes.modalHeader}>
            <button onClick={closeModal}>&times;</button>
        </div>
    )
}

export default observer(ModalHeader)