import React from "react";
import classes from "./style.module.scss";
import {useStore} from "../../../hooks/useStore";
import {observer} from "mobx-react";
import {IBodyInterface} from "../../../api/utils";
import {User} from "../../../store/userStore/User";

interface IProps {
    user?: User,
    disable: boolean,
    dataBody: IBodyInterface,
    closeModal: () => void,
}

const ModalFooter = ({user, disable, dataBody,closeModal}: IProps) => {
    const {userStore} = useStore()
    const onSave = () => {
        if (user) {
            user.change(dataBody)
            closeModal()
        } else {
            userStore.addUser(dataBody)
        }
    }
    return (
        <div className={classes.modalFooter}>
            {user ? <button onClick={() => user?.delete()}>
                    удалить
                </button> :
                <div></div>}
            <button onClick={onSave}
                    disabled={disable}
            >
                {user ? 'сохранить' : 'создать'}
            </button>
        </div>
    )
}

export default observer(ModalFooter)