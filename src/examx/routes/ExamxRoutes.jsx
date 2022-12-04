import { Navigate, Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/MainPage"
import { NewExam } from "../pages/NewExam"

export const ExamxRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <MainPage/> }/>
            <Route path="/newexam" element={ <NewExam/> }/>
            <Route path="/*" element={ <Navigate to='/'/> }/>
        </Routes>
    )
}
