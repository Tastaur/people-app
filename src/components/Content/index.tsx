import React from "react";
import Item from "../Item";
import classes from "./style.module.scss";

interface IProps{
    userIds: number[]
}

const Content = ({userIds}:IProps) =>{
    return(
        <div className={classes.content}>
            {userIds.map(userId=> <Item userId={userId} key={userId}/>)}
            <Item/>
        </div>
    )
}
export default Content