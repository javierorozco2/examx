import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ExamxRoutes } from "../examx/routes/ExamxRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={ <AuthRoutes/>}/>

            <Route path="/" element={ <ExamxRoutes/> } />
        </Routes>
    )
}
