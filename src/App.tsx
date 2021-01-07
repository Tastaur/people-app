import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {useStore} from "./hooks/useStore";
import Pagination from "./components/Pagination";
import Preloader from "./components/Preloader";
import Content from "./components/Content";

function App() {
    const {userStore} = useStore()
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        userStore.fetchUserPerPage(currentPage)
    }, [currentPage])
    if (userStore.isLoading) {
        return <Preloader/>
    }
    return (
        <div>
            <Content userIds={userStore.userIds}/>
            <Pagination currentPage={currentPage}
                        pages={userStore.pages}
                        setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default observer(App);
