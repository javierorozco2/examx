import { useCheckAuth } from '../../hooks/useCheckAuth'
import { Sidebar, Overview, Search } from '../components/MainPage'
import '../css/main-styles.css'
import { validateMyExam } from '../helpers/validateMyExam'

export const MainPage = () => {

    const itsmyexam = validateMyExam()

    useCheckAuth() //Actualizar datos de auth y examenes

    return (
        <div className='main-supercontainer'>

            <Sidebar />
            
            <div className='main-container'>


                {itsmyexam ? '' : <Search />}
                {/* <Search/> */}

                <div className='main-line' />

                <Overview />

            </div>
        </div>
    )
}