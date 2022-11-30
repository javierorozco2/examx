import { Navigate, Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/MainPage"

export const ExamxRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <MainPage/> }/>
            <Route path="/*" element={ <Navigate to='/'/> }/>
        </Routes>
    )
}
