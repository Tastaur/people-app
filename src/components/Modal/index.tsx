import React, {useState} from "react";
import classes from "./style.module.scss";
import {observer} from "mobx-react";
import {useStore} from "../../hooks/useStore";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import Input, {InputProps} from "../Input";
import {IBodyInterface} from "../../api/utils";

interface IProps {
    userId?: number,
    closeModal: () => void,
}

const Modal = ({userId, closeModal}: IProps) => {
    const {userStore} = useStore()
    const user = userStore.getUserById(userId || 0)
    const title = user ? user.fullName : 'Создать пользователя'
    const [userAvatar, setUserAvatar] = useState<string>(user?.avatar || '')
    const [userEmail, setUserEmail] = useState<string>(user?.email || '')
    const [userLastName, setUserLastName] = useState<string>(user?.lastName || '')
    const [userFirstName, setUserFirstName] = useState<string>(user?.fistName || '')
    const data: InputProps[] = [
        {label: 'Имя', setValue: setUserFirstName, value: userFirstName},
        {label: 'Фамилия', setValue: setUserLastName, value: userLastName},
        {
            label: 'Email',
            setValue: setUserEmail,
            value: userEmail,
            validate: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        },
        {label: 'Аватар', setValue: setUserAvatar, value: userAvatar},
    ]
    const dataBody: IBodyInterface = {
        email: userEmail,
        first_name: userFirstName,
        last_name: userLastName,
        avatar: userAvatar
    }
    return (
        <div
            className={classes.wrapper}>
            <div className={classes.modal}>
                <ModalHeader closeModal={closeModal}/>
                <div className={classes.modalContent}>
                    <h2>{title}</h2>
                    {user ? <img src={user.avatar} alt={user.avatar}/> : null}
                    {data.map(item => <Input
                        key={item.label}
                        value={item.value}
                        label={item.label}
                        setValue={item.setValue}
                        validate={item.validate}/>)}
                </div>
                <ModalFooter
                    disable={data.some(item => item.value === '')}
                    user={user}
                    closeModal={closeModal}
                    dataBody={dataBody}
                />
            </div>
        </div>
    )
}

export default observer(Modal)