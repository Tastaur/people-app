import React from "react";
import classes from './style.module.scss'

interface IProps {
    setCurrentPage: (page: number) => void
    currentPage: number,
    pages: number[]

}

const Pagination = ({setCurrentPage, currentPage, pages}: IProps) => {
    return (
        <div className={classes.wrapper}>
            {pages.map(page=> <button
                className={page === currentPage ? classes.active : ''}
                onClick={()=>setCurrentPage(page)}
                key={page}
                disabled={page === currentPage}
                >{page}</button>)}
        </div>
    )
}

export default Pagination