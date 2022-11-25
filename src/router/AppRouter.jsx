import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ExamxRoutes } from "../examx/routes/ExamxRoutes"

export const AppRouter = () => {
    return (
        <Routes>

            {/* Apartado auth */}
            <Route path="/auth/*" element={ <AuthRoutes/>}/>

            {/* Menu principal -> acceso solo con cuenta */}
            <Route path="/" element={ <ExamxRoutes/> } />
        </Routes>
    )
}
