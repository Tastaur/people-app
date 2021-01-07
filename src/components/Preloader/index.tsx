import React from "react";
import preloader from '../../static/25.gif'
import classes from './style.module.scss';

const Preloader = () => {
    return <div className={classes.wrapper}>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader