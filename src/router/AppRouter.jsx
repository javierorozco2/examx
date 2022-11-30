import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ExamxRoutes } from "../examx/routes/ExamxRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { CheckingAuth } from "../ui/CheckingAuth"

export const AppRouter = () => {

    const status = useCheckAuth()

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<ExamxRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
