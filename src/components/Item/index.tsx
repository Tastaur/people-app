import React, {useState} from "react";
import {observer} from "mobx-react";
import {useStore} from "../../hooks/useStore";
import classes from "./style.module.scss";
import Modal from "../Modal";

interface IProps {
    userId?: number
}

const Item = ({userId}: IProps) => {
    const {userStore} = useStore()
    const user = userId ? userStore.getUserById(userId) : undefined
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <>
            <div
                className={`${classes.wrapper} ${!user ? classes.emptyWrapper : ''}`}
                onClick={() => setOpenModal(true)}
            >
                {user ? (
                        <>
                            <img src={user.avatar} alt=""/>
                            <h2>{user.fullName}</h2>
                        </>)
                    : <h2>
                        +
                    </h2>}
            </div>
            {openModal && <Modal userId={userId} closeModal={()=>setOpenModal(false)}/>}
        </>
    )
}

export default observer(Item)